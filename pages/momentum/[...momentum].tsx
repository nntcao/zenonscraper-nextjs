import ErrorPage from "../404"
import Layout from "../../components/Layout"
import Searchbar from "../../components/Searchbar"
import styles from './momentum.module.scss'
import * as db from "../../services/db"
import AccountBlockTable from "../../components/AccountBlockTable"
import Link from "next/link"

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


function Momentum({ accountBlocks, momentumHeight, page, countBlocks }) {
    if (!accountBlocks || accountBlocks === null || accountBlocks.length === 0) {
        return (
            <ErrorPage />
        )
    }

    return (
        <Layout>
            <div className={styles.main}>
                <Searchbar />
                <h2 className={styles.tableTitle}>Momentum {momentumHeight} Account Blocks/Transactions</h2>
                <h2 className={styles.tableTitle}>Page {page}</h2>
                <AccountBlockTable accountBlocks={accountBlocks} />
                <Choices count={countBlocks} currentPage={page} height={momentumHeight}/>
            </div>
        </Layout>
    )
}

function Choices({ currentPage, count, height }) {
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
                        <Link key={page} href={{pathname: '/momentum/[momentum]/[page]', query: { momentum: height, page: page }}}>
                            <a className={styles.pageLink}>{page}</a>
                        </Link>
                    )
                }
            })}
        </div>
    )
}


export default Momentum