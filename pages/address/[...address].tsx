import ErrorPage from "../404"
import Layout from "../../components/Layout"
import Searchbar from "../../components/Searchbar"
import styles from './address.module.scss'
import * as db from "../../services/db"
import Link from "next/link"
import AccountBlockTable from "../../components/AccountBlockTable"

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
                <Searchbar />
                <h2 className={styles.tableTitle}>Account Blocks for Address {address}</h2>
                <h2 className={styles.tableTitle}>Page {page}</h2>
                <AccountBlockTable accountBlocks={accountBlocks}/>
                <Choices count={countBlocks} currentPage={page} address={address}/>
            </div>
        </Layout>
    )
}

function Choices({ currentPage, count, address }) {
    if (count <= 0) {
        return <></>
    }
    const pages = Array.from({length: Number(Math.ceil(count / numPerPage))}, (_, i) => i + 1)
    return (
        <div className={styles.pageNumbers}>
            {pages.map(page => {
                if (Number(page) === Number(currentPage)) {
                    return (
                        <div key={page} className={styles.pageLink}>
                            {page}
                        </div>
                    )
                } else {
                    return (
                        <Link key={page} href={{pathname: '/address/[address]/[page]', query: { address: address, page: page }}}>
                            <a className={styles.pageLink}>{page}</a>
                        </Link>
                    )
                }
            })}
        </div>
    )
}


export default AddressAccountBlockList