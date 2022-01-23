import ErrorPage from "../404"
import Layout from "../../components/Layout"
import Searchbar from "../../components/Searchbar"
import styles from './token.module.scss'
import * as db from "../../services/db"
import HoldersTable from "../../components/HoldersTable"
import Link from "next/link"

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
                <Searchbar />
                <h2 className={styles.tableTitle}>Holders for Token {token.symbol}</h2>
                <h2 className={styles.tableTitle}>Page {page}</h2>
                <HoldersTable holders={holders} token={token} startRank={(page - 1) * numPerPage + 1}/>
                <Choices count={countHolders} currentPage={page} symbol={token.symbol}/>
            </div>
        </Layout>
    )
}

function Choices({ currentPage, count, symbol }) {
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
                        <Link key={page} href={{pathname: '/token/[token]/[page]', query: { token: symbol, page: page }}}>
                            <a className={styles.pageLink}>{page}</a>
                        </Link>
                    )
                }
            })}
        </div>
    )
}


export default HoldersList