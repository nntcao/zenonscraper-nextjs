import * as db from '../../services/db'
import * as time from '../../utils/time'
import ErrorPage from '../404'
import styles from './token.module.scss'
import Layout from '../../components/Layout'
import Link from 'next/link'

export async function getServerSideProps(context) {
    const searchString: string = context.params.token
    if (searchString.length >= 3 && searchString.substring(0, 3).toLowerCase() == 'zts') {
        var tokenQuery = await db.query(`
            SELECT * FROM token
            WHERE tokenstandard = $1
        `, [searchString])
    } else {
        var tokenQuery = await db.query(`
            SELECT * FROM token
            WHERE symbol = $1
        `, [searchString])
    }

    var holdersQuery = await db.query(`
        SELECT * FROM balance 
        WHERE tokenstandard = $1
        ORDER BY balance DESC
        LIMIT 25
    `, [tokenQuery?.rows[0]?.tokenstandard])


    return { 
        props: {
            tokenInformation: tokenQuery?.rows[0] ?? null,
            holdersInformation: holdersQuery?.rows ?? null
        }

    }
}

function Token({ tokenInformation, holdersInformation }) {
    if (!tokenInformation) {
        return (
            <ErrorPage />
        )
    }

    return (
        <Layout>
            <div className={styles.main}>
                <TokenCard token={tokenInformation}/>
                <h2 className={styles.tableTitle}>Top 25 Holders</h2>
                <hr/>
                <Holders holders={holdersInformation} token={tokenInformation}/>
            </div>
        </Layout>
    )
}

function TokenCard({ token }) {
    return (
        <div className={styles.card}>
            <div className={styles.titleline}>
                <h2 className={styles.cardTitle}>Token {token.symbol} ({token.tokenstandard})</h2>
            </div>
            <hr />

            <div className={styles.cardbody}>
                <div className={styles.rowleft}>Name: </div>
                <div className={styles.rowright}>{token.name ?? 'N/A'}</div>
                <div className={styles.rowleft}>Symbol: </div>
                <div className={styles.rowright}>{token.symbol ?? 'N/A'}</div>
                <div className={styles.rowleft}>Token Standard:</div>
                <div className={styles.rowright}>
                    <Link href={{pathname: '/token/[token]', query: { token: token.tokenstandard }}}>
                        <a>{token.tokenstandard ?? 'N/A'}</a>
                    </Link>
                </div>
                <div className={styles.rowleft}>Domain: </div>
                <div className={styles.rowright}>
                    <a href={`${formatExternalLink(token.domain)}`}
                    rel="noopener noreferrer">
                        {token.domain ?? 'N/A'}
                    </a>
                </div>
                <div className={styles.rowleft}>Owner: </div>
                <div className={styles.rowright}>
                    <Link href={{pathname: '/address/[address]', query: { address: token.owner }}}>
                        <a>{token.owner ?? 'N/A'}</a>
                    </Link>
                </div>
                <div className={styles.rowleft}>Total Supply:</div>
                <div className={styles.rowright}>{Number(token.totalsupply / (10 ** token.decimals)).toLocaleString()} ({Number(token.totalsupply).toLocaleString()})</div>
                <div className={styles.rowleft}>Max Supply: </div>
                <div className={styles.rowright}>{Number(token.maxsupply / (10 ** token.decimals)).toLocaleString()} ({Number(token.maxsupply).toLocaleString()})</div>
                <div className={styles.rowleft}>Decimals: </div>
                <div className={styles.rowright}>{token.decimals ?? 'N/A'}</div>
                <div className={styles.rowleft}>Is Burnable:</div>
                <div className={styles.rowright}>{token?.isburnable?.toString() ?? 'N/A'}</div>
                <div className={styles.rowleft}>Is Mintable: </div>
                <div className={styles.rowright}>{token?.ismintable?.toString() ?? 'N/A'}</div>
                <div className={styles.rowleft}>Is Utility: </div>
                <div className={styles.rowright}>{token?.isutility?.toString() ?? 'N/A'}</div>
            </div>
        </div>
    )
}

function Holders({ holders, token }) {
    let rank = 1

    if (!holders || holders === null || holders.length === 0) {
        return (
            <div> No holders for this token</div>
        )
    } else {
        return (
            <div className={styles.tablescroll}>
                <table className={styles.table}>
                    <thead className={styles.abheader}>
                        <tr>
                            <th scope="col" className="abrow">Rank</th>
                            <th scope="col" className="abrow">Address</th>
                            <th scope="col" className="abrow">Amount</th>
                            <th scope="col" className="abrow">Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            holders.map(holder => {    
                            return (
                                <tr className={styles.abrows} key = {holder.address}>
                                    <td className={styles.abrow}>
                                        {rank++}
                                    </td>
                                    <td className={styles.abrow}>
                                        <Link href={{pathname: '/address/[address]', query: { address: holder.address }}}>
                                            <a>{holder.address}</a>
                                        </Link>
                                    </td>
                                    <td className={`${styles.abrow} ${styles.truncate}`}>
                                        {(Number(holder.balance) / (10 ** token.decimals)).toLocaleString(undefined, {'minimumFractionDigits':2,'maximumFractionDigits':2})}
                                    </td>
                                    <td className={`${styles.abrow} ${styles.truncate}`}>
                                        {(Number(holder.balance) / Number(token.totalsupply) * 100).toLocaleString(undefined, {'minimumFractionDigits':2,'maximumFractionDigits':2})}%
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

function formatExternalLink(url: string) {
    if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
    }
    return url
}

export default Token