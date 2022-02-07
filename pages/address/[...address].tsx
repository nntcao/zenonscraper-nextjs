import ErrorPage from "../404"
import Layout from "../../components/Layout/Layout"
import Searchbar from "../../components/Searchbar/Searchbar"
import styles from './addressAccountBlocks.module.scss'
import * as db from "../../services/db"
import Link from "next/link"
import AccountBlockTable from "../../components/AccountBlockTable/AccountBlockTable"
import Image from "next/image"

const numPerPage = 25

export async function getServerSideProps(context) {
    context.res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )
    
    const searchString: Array<string> = context.params.address
    var address: string = searchString[0]
    const page: number = Number(searchString[1])

    const addressQuery = await db.query(`
        SELECT address FROM address WHERE address = $1
    `, [address])

    const accountBlockQuery = await db.query(`
        SELECT b.hash, b.address, b.toaddress, b.amount, b.tokenstandard, b.usedplasma, b.momentumheight,
            b.timestamp, token.symbol, token.decimals
        FROM (
            SELECT a.hash, a.address, a.toaddress, a.amount, a.tokenstandard, a.usedplasma, momentum.height as momentumheight,
                momentum.timestamp
            FROM (
                    SELECT * FROM accountblock
                    WHERE address = $1 OR toaddress = $1
                ) AS a
            INNER JOIN momentum
            ON momentum.hash = a.momentumhash
            ORDER BY momentum.height DESC, a.hash
            OFFSET $3
            LIMIT $2
        ) AS b
        INNER JOIN token
        ON b.tokenstandard = token.tokenstandard
        ORDER BY b.momentumheight DESC
    `, [address, numPerPage, (page - 1) * numPerPage])

    const countBlocksQuery = await db.query(`
        SELECT COUNT(hash) as countblocks FROM accountblock
        WHERE address = $1 OR toaddress = $1
    `, [address])

    return {
        props: {
            address: addressQuery.rows[0].address ?? null,
            accountBlocks: accountBlockQuery?.rows ?? null,
            countBlocks: countBlocksQuery?.rows[0]?.countblocks ?? null,
            page: page,
        }
    }
}

export function AddressAccountBlockList({ accountBlocks, page, countBlocks, address }) {
    if (!address) {
        return (
            <ErrorPage />
        )
    }
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
                                <h2 className={styles.cardTitle}>Transactions for&nbsp;
                                    <Link href={{ pathname: '/address/[address]', query: { address: address } }}>
                                        <a className={styles.cardTitle}>Address {address}</a>
                                    </Link>
                                </h2>
                                <h2 className={styles.cardSubtitle}>Displaying {1 + (page - 1) * numPerPage} - {page * numPerPage}</h2>
                            </div>
                            <div className={styles.cardHeaderRight}>
                                <Pagination currentPage={page} count={countBlocks} address={address}/>
                            </div>
                        </div>
                        <AccountBlockTable accountBlocks={accountBlocks}/>
                    </div>
                    <div className={styles.paginationWrapper}>
                        <Pagination currentPage={page} count={countBlocks} address={address}/>
                    </div>
                </div>
            </div>
        </Layout>
    
    )
}

function Pagination({ currentPage, count, address }) {

    var pages: number[] = []
    const maxPage = Math.ceil(count / numPerPage)
    if (currentPage == 1 || currentPage == 2) {
        for (let i = 1; i <6; i++) {
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
            <BackArrow currentPage={currentPage} maxPage={maxPage} address={address}/>
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
                            <Link key={page} href={{ pathname: '/address/[address]/[page]', query: { address: address, page: page } }} scroll={false}>
                                <a className={`${styles.pageLink} ${styles.pageText}`}>{page}</a>
                            </Link>
                        )
                    }
                })}
            </div>
            <ForwardArrow currentPage={currentPage} maxPage={maxPage} address={address}/>
        </div>
    )
}

function ForwardArrow({ address: address, currentPage, maxPage }) {
    if (currentPage + 1 <= 0 || currentPage + 1 > maxPage) {
        return <div className={styles.imageSpacer}></div>
    }
    return (
        <Link href={{ pathname: '/address/[address]/[page]', query: { address: address, page: currentPage + 1 } }} scroll={false}>
            <a className={`${styles.pageLink} ${styles.imageFilterToBlack}`}>
                <Image src="/keyboard_arrow_right_black_24dp.svg" alt="go forward one page" width={24} height={24} />
            </a>
        </Link>
    )
}

function BackArrow({ address, currentPage, maxPage }) {
    if (currentPage - 1 <= 0 || currentPage - 1 > maxPage) {
        return <div className={styles.imageSpacer}></div>
    }
    return (
        <Link href={{ pathname: '/address/[address]/[page]', query: { address: address, page: currentPage - 1 } }} scroll={false}>
            <a className={`${styles.pageLink} ${styles.imageFilterToBlack}`}>
                <Image src="/keyboard_arrow_left_black_24dp.svg" alt="go back one page" width={24} height={24} />
            </a>
        </Link>
    )
}



export default AddressAccountBlockList