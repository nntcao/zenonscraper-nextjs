import ErrorPage from "../404"
import Layout from "../../components/Layout/Layout"
import Searchbar from "../../components/Searchbar/Searchbar"
import styles from './token.module.scss'
import * as db from "../../services/db"
import HoldersTable from "../../components/HoldersTable/HoldersTable"
import Link from "next/link"
import Image from "next/image"

const numPerPage = 25

export async function getServerSideProps(context) {
    context.res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )

    const searchString: Array<string> = context.params.token
    var tokenIdentifier: string = searchString[0]
    const page: number = Number(searchString[1])

    if (tokenIdentifier.length > 7 && tokenIdentifier.substring(0, 3).toLowerCase() == 'zts') {
        var tokenQuery = await db.query(`
            SELECT * FROM token
            WHERE tokenstandard = $1
        `, [tokenIdentifier])
    } else {
        var tokenQuery = await db.query(`
            SELECT * FROM token
            WHERE symbol = $1
        `, [tokenIdentifier.toUpperCase()])
    }

    const holdersQuery = await db.query(`
        SELECT * FROM balance 
        WHERE tokenstandard = $1
        ORDER BY balance DESC
        OFFSET $2
        LIMIT 25
    `, [tokenQuery?.rows[0]?.tokenstandard, (page - 1) * numPerPage])

    const countHoldersQuery = await db.query(`
        SELECT COUNT(address) as countholders FROM balance
        WHERE tokenstandard = $1
    `, [tokenQuery?.rows[0]?.tokenstandard])

    return {
        props: {
            holders: holdersQuery?.rows ?? null,
            page: page ?? null,
            token: tokenQuery?.rows[0] ?? null,
            countHolders: countHoldersQuery?.rows[0]?.countholders ?? null
        }
    }
}


export function HoldersList({ holders, page, token, countHolders }) {
    if (!holders || holders === null || holders.length === 0) {
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
                                <h2 className={styles.cardTitle}>Holders for  
                                    <Link href={{ pathname: '/token/[symbol]', query: { symbol: token.symbol } }}>
                                        <a className={styles.cardTitle}> Token {token.symbol}</a>
                                    </Link>
                                </h2>
                                <h2 className={styles.cardSubtitle}>Displaying {1 + (page - 1) * numPerPage} - {page * numPerPage}</h2>
                            </div>
                            <div className={styles.cardHeaderRight}>
                                <Pagination currentPage={page} count={countHolders} symbol={token.symbol} />
                            </div>
                        </div>
                        <HoldersTable holders={holders} token={token} startRank={(page - 1) * numPerPage + 1} />
                    </div>
                    <div className={styles.paginationWrapper}>
                        <Pagination currentPage={page} count={countHolders} symbol={token.symbol} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

function Pagination({ currentPage, count, symbol }) {

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
            <BackArrow currentPage={currentPage} maxPage={maxPage} symbol={symbol} />
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
                            <Link key={page} href={{ pathname: '/token/[symbol]/[page]', query: { symbol: symbol, page: page } }} scroll={false}>
                                <a className={`${styles.pageLink} ${styles.pageText}`}>{page}</a>
                            </Link>
                        )
                    }
                })}
            </div>
            <ForwardArrow currentPage={currentPage} maxPage={maxPage} symbol={symbol} />
        </div>
    )
}

function ForwardArrow({ symbol, currentPage, maxPage }) {
    if (currentPage + 1 <= 0 || currentPage + 1 > maxPage) {
        return <div className={styles.imageSpacer}></div>
    }
    return (
        <Link href={{ pathname: '/token/[symbol]/[page]', query: { symbol: symbol, page: currentPage + 1 } }} scroll={false}>
            <a className={`${styles.pageLink} ${styles.imageFilterToBlack}`}>
                <Image src="/keyboard_arrow_right_black_24dp.svg" alt="go forward one page" width={24} height={24} />
            </a>
        </Link>
    )
}

function BackArrow({ symbol, currentPage, maxPage }) {
    if (currentPage - 1 <= 0 || currentPage - 1 > maxPage) {
        return <div className={styles.imageSpacer}></div>
    }
    return (
        <Link href={{ pathname: '/token/[symbol]/[page]', query: { symbol: symbol, page: currentPage - 1 } }} scroll={false}>
            <a className={`${styles.pageLink} ${styles.imageFilterToBlack}`}>
                <Image src="/keyboard_arrow_left_black_24dp.svg" alt="go back one page" width={24} height={24} />
            </a>
        </Link>
    )
}


export default HoldersList