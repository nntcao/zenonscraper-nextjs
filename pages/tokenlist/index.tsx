import Layout from '../../components/Layout/Layout'
import SearchBar from '../../components/Searchbar/Searchbar'
import TokenTable from '../../components/TokenTable/TokenTable'
import * as db from '../../services/db'
import styles from './TokenList.module.scss'

export async function getServerSideProps(context) {
    context.res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )
    
    const tokenQuery = await db.query(`
    SELECT * FROM
        (SELECT token.symbol, token.tokenstandard, token.totalsupply, token.decimals, token.description, COUNT(address) as countholders FROM balance
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
                <div className={styles.searchBarWrapper}>
                    <SearchBar />
                </div>
                <div className={styles.card}>
                    <div className={styles.cardContent}>
                        <div className={styles.cardHeader}>
                            <div className={styles.cardHeaderLeft}>
                                <h2 className={styles.cardTitle}>Token List</h2>
                                <h2 className={styles.cardSubtitle}>Displaying All Tokens</h2>
                            </div>
                        </div>
                        <TokenTable tokens={tokens}/>
                    </div>
                </div>
            </div>
        </Layout>
    
    )
}