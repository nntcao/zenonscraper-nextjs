import ErrorPage from "../404"
import Layout from "../../components/Layout/Layout"
import Searchbar from "../../components/Searchbar/Searchbar"
import styles from './momentumAccountBlocks.module.scss'
import * as db from "../../services/db"
import AccountBlockTable from "../../components/AccountBlockTable/AccountBlockTable"
import Link from "next/link"
import Image from "next/image"

const numPerPage = 25

export async function getServerSideProps(context) {
    context.res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )

    const searchString: Array<string> = context.params.momentum
    var momentumIdentifier: string = searchString[0]
    const page: number = Number(searchString[1])

    if (Number(momentumIdentifier)) {
        var momentumHeight: number = Number(momentumIdentifier)
        momentumIdentifier = String((await db.query(`
            SELECT hash from momentum
            WHERE height = $1
        `, [Number(momentumIdentifier)])
        )?.rows[0]?.hash)
    } else {
        var momentumHeight: number = Number((await db.query(`
            SELECT height from momentum
            WHERE hash = $1
        `, [momentumIdentifier])
        )?.rows[0]?.height)
    }

    var accountBlockQuery = await db.query(`
        SELECT b.hash, b.address, b.toaddress, b.amount, b.tokenstandard, b.usedplasma, b.momentumheight,
            b.timestamp, token.symbol, token.decimals
        FROM (
            SELECT a.hash, a.address, a.toaddress, a.amount, a.tokenstandard, a.usedplasma, momentum.height as momentumheight,
                momentum.timestamp
            FROM (
                    SELECT * FROM accountblock
                    WHERE momentumhash = $1
                ) AS a
            INNER JOIN momentum
            ON momentum.hash = a.momentumhash
            ORDER BY timestamp DESC, a.hash
            OFFSET $2
            LIMIT $3
        ) AS b
        INNER JOIN token
        ON b.tokenstandard = token.tokenstandard
    `, [momentumIdentifier, (page - 1) * numPerPage, numPerPage])

    var countBlocks = await db.query(`
        SELECT COUNT(hash) as countblocks FROM accountblock
        WHERE momentumhash = $1
    `, [momentumIdentifier])

    return {
        props: {
            momentumHeight: momentumHeight ?? null,
            accountBlocks: accountBlockQuery?.rows ?? null,
            page: page ?? null,
            countBlocks: countBlocks?.rows[0]?.countblocks ?? null,
        }
    }
}


export default function Momentum({ accountBlocks, momentumHeight, page, countBlocks }) {
    if (!accountBlocks || accountBlocks === null || accountBlocks.length === 0) {
        return (
            <ErrorPage />
        )
    }

    return (
        <Layout>
            <div className={styles.main}>
                <div className={styles.searchBarWrapper}>
                    <Searchbar />
                </div>
                <div className={styles.card}>
                    <div className={styles.cardContent}>
                        <div className={styles.cardHeader}>
                            <div className={styles.cardHeaderLeft}>
                                <h2 className={styles.cardTitle}>
                                    Transactions for&nbsp;
                                    <Link key={page} href={{ pathname: '/momentum/[height]', query: { height: momentumHeight } }} scroll={false}>
                                        <a className={styles.cardTitle}>Momentum {momentumHeight}</a>
                                    </Link>
                                </h2>
                                <h2 className={styles.cardSubtitle}>Displaying {1 + (page - 1) * numPerPage} - {page * numPerPage}</h2>
                            </div>
                            <div className={styles.cardHeaderRight}>
                                <Pagination currentPage={page} count={countBlocks} height={momentumHeight} />
                            </div>
                        </div>
                        <AccountBlockTable accountBlocks={accountBlocks} />
                    </div>
                    <div className={styles.paginationWrapper}>
                        <Pagination currentPage={page} count={countBlocks} height={momentumHeight} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

function Pagination({ currentPage, count, height }) {

    var pages: number[] = []
    const maxPage = Math.ceil(count / numPerPage)
    if (currentPage == 1 || currentPage == 2) {
        for (let i = 1; i < 6; i++) {
            pages.push(i)
        }
    } else {
        for (let i = -2; i < 3; i++) {
            if (!pages.includes(currentPage + i) && currentPage + i > 0) {
                pages.push(currentPage + i)
            }
        }
    }
    for (let i = pages.length - 1; i >= 0; i--) {
        if (pages[i] > maxPage) {
            pages.splice(i, 1)
        }
    }

    return (
        <div className={styles.pagination}>
            <BackArrow currentPage={currentPage} maxPage={maxPage} height={height} />
            <div className={styles.pageNumbers}>
                {pages.map(page => {
                    if (Number(page) === Number(currentPage)) {
                        return (
                            <div key={page} className={`${styles.pageText} ${styles.strongText}`}>
                                {page}
                            </div>
                        )
                    } else {
                        return (
                            <Link key={page} href={{ pathname: '/momentum/[height]/[page]', query: { height: height, page: page } }} scroll={false}>
                                <a className={`${styles.pageLink} ${styles.pageText}`}>{page}</a>
                            </Link>
                        )
                    }
                })}
            </div>
            <ForwardArrow currentPage={currentPage} maxPage={maxPage} height={height} />
        </div>
    )
}

function ForwardArrow({ height, currentPage, maxPage }) {
    if (currentPage + 1 <= 0 || currentPage + 1 > maxPage) {
        return <div className={styles.imageSpacer}></div>
    }
    return (
        <Link href={{ pathname: '/momentum/[height]/[page]', query: { height: height, page: currentPage + 1 } }} scroll={false}>
            <a className={`${styles.pageLink} ${styles.imageFilterToBlack}`}>
                <Image src="/keyboard_arrow_right_black_24dp.svg" alt="go forward one page" width={24} height={24} />
            </a>
        </Link>
    )
}

function BackArrow({ height, currentPage, maxPage }) {
    if (currentPage - 1 <= 0 || currentPage - 1 > maxPage) {
        return <div className={styles.imageSpacer}></div>
    }
    return (
        <Link href={{ pathname: '/momentum/[height]/[page]', query: { height: height, page: currentPage - 1 } }} scroll={false}>
            <a className={`${styles.pageLink} ${styles.imageFilterToBlack}`}>
                <Image src="/keyboard_arrow_left_black_24dp.svg" alt="go back one page" width={24} height={24} />
            </a>
        </Link>
    )
}
