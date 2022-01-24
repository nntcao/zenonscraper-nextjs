import * as db from '../../services/db'
import Layout from '../../components/Layout'
import styles from './TokenList.module.scss'
import TokenTable from '../../components/TokenTable'
import SearchBar from '../../components/Searchbar'

export async function getServerSideProps(context) {
    context.res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )
    
    const tokenQuery = await db.query(`
    SELECT * FROM
        (SELECT token.symbol, token.tokenstandard, token.totalsupply, token.decimals, COUNT(address) as countholders FROM balance
            INNER JOIN token
            ON token.tokenstandard = balance.tokenstandard
            GROUP BY token.symbol, token.tokenstandard, token.totalsupply, token.decimals) AS b
        ORDER BY b.countholders DESC
    `)
    
    return { 
        props: {
            tokens: tokenQuery?.rows ?? null,
        }
    }
}


export default function TokenList({ tokens }) {
    return (
        <Layout>
            <div className={styles.main}>
                <SearchBar />
                <h2 className={styles.tableTitle}>Token List</h2>
                <TokenTable tokens={tokens}/>
            </div>
        </Layout>
    )
}