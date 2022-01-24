import ErrorPage from "../../404"
import Layout from "../../../components/Layout"
import Searchbar from "../../../components/Searchbar"
import styles from './token.module.scss'
import * as db from "../../../services/db"
import HoldersTable from "../../../components/HoldersTable"
import Link from "next/link"
import AccountBlockTable from "../../../components/AccountBlockTable"

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

    const accountBlockQuery = await db.query(`
        SELECT accountblock.hash, momentum.height as momentumheight, momentum.timestamp, accountblock.address, accountblock.toaddress, 
        accountblock.amount, token.symbol, token.decimals, accountblock.usedplasma
        FROM 
            (
                SELECT * FROM accountblock
                WHERE accountblock.tokenstandard = $1
            ) AS accountblock
        INNER JOIN momentum
        ON accountblock.momentumhash = momentum.hash
        INNER JOIN token
        ON accountblock.tokenstandard = token.tokenstandard
        ORDER BY momentum.timestamp DESC, accountblock.hash
        OFFSET $3
        LIMIT $2
    `, [tokenQuery?.rows[0]?.tokenstandard, numPerPage, (page - 1) * numPerPage])

    const countAccountBlocksQuery = await db.query(`
        SELECT COUNT(hash) as countblocks FROM accountblock
        WHERE tokenstandard = $1
    `, [tokenQuery?.rows[0]?.tokenstandard])

    return { 
        props: {
            page: page ?? null,
            token: tokenQuery?.rows[0] ?? null,
            countBlocks: countAccountBlocksQuery?.rows[0]?.countblocks ?? null,
            accountBlocks: accountBlockQuery?.rows ?? null
        }
    }
}


export function AccountBlockTokenList({ page, token, countBlocks, accountBlocks }) {
    if (!token || token === null || token.length === 0) {
        return (
            <ErrorPage />
        )
    }

    return (
        <Layout>
            <div className={styles.main}>
                <Searchbar />
                <h2 className={styles.tableTitle}>Recent Account Blocks for Token {token.symbol}</h2>
                <h2 className={styles.tableTitle}>Page {page}</h2>
                <AccountBlockTable accountBlocks={accountBlocks}/>
                <Choices count={countBlocks} currentPage={page} symbol={token.symbol}/>
            </div>
        </Layout>
    )
}

function Choices({ currentPage, count, symbol }) {
    if (count <= 0) {
        return <></>
    }

    var pages: number[] = [1]
    const maxPage: number = Math.ceil(count / numPerPage)
    for (let i = -2; i < 3; i++) {
        if (!pages.includes(currentPage + i) && currentPage + i > 0 && currentPage + i <= maxPage) {
            pages.push(currentPage + i)
        }
    }
    if (!pages.includes(maxPage) && maxPage > 0) {
        pages.push(maxPage)
    }
    
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
                        <Link key={page} href={{pathname: '/token/txs/[token]/[page]', query: { token: symbol, page: page }}}>
                            <a className={styles.pageLink}>{page}</a>
                        </Link>
                    )
                }
            })}
        </div>
    )
}


export default AccountBlockTokenList