import * as db from '../../services/db'
import * as time from '../../utils/time'
import ErrorPage from '../404'
import styles from './token.module.scss'
import Layout from '../../components/Layout'
import Link from 'next/link'
import HoldersTable from '../../components/HoldersTable'

export async function getServerSideProps(context) {
    context.res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
      )

    const searchString: string = String(context.params.token)
    if (searchString.length > 7 && searchString.substring(0, 3).toLowerCase() == 'zts') {
        var tokenQuery = await db.query(`
            SELECT * FROM token
            WHERE tokenstandard = $1
        `, [searchString])
    } else {
        var tokenQuery = await db.query(`
            SELECT * FROM token
            WHERE symbol = $1
        `, [searchString.toUpperCase()])
    }

    var holdersQuery = await db.query(`
        SELECT * FROM balance 
        WHERE tokenstandard = $1
        ORDER BY balance DESC
        LIMIT 25
    `, [tokenQuery?.rows[0]?.tokenstandard])

    const countHoldersQuery = await db.query(`
        SELECT COUNT(address) as countholders FROM balance
        WHERE tokenstandard = $1
    `, [tokenQuery?.rows[0]?.tokenstandard])

    return { 
        props: {
            tokenInformation: tokenQuery?.rows[0] ?? null,
            holdersInformation: holdersQuery?.rows ?? null,
            countHolders: countHoldersQuery?.rows[0]?.countholders ?? null
        }

    }
}

function Token({ tokenInformation, holdersInformation, countHolders }) {
    if (!tokenInformation) {
        return (
            <ErrorPage />
        )
    }

    return (
        <Layout>
            <div className={styles.main}>
                <TokenCard token={tokenInformation} countHolders={countHolders}/>
                <h2 className={styles.tableTitle}>Top 25 Holders</h2>
                <HoldersTable holders={holdersInformation} token={tokenInformation} startRank={1}/>
                <Link href={{pathname: '/token/[token]/[page]', query: { token: tokenInformation.tokenstandard, page: 1 }}}>
                    <a className={styles.seeMore}>See more</a>
                </Link>
            </div>
        </Layout>
    )
}

function TokenCard({ token, countHolders }) {
    return (
        <div className={styles.card}>
            <div className={styles.titleline}>
                <h2 className={styles.cardTitle}>Token {token.symbol} ({token.tokenstandard})</h2>
            </div>
            <hr />

            <div className={styles.cardbody}>
                <div className={styles.cardleft}>Name: </div>
                <div className={styles.cardright}>{token.name ?? 'N/A'}</div>
                <div className={styles.cardleft}>Symbol: </div>
                <div className={styles.cardright}>{token.symbol ?? 'N/A'}</div>
                <div className={styles.cardleft}>Token Standard:</div>
                <div className={styles.cardright}>
                    <Link href={{pathname: '/token/[token]', query: { token: token.tokenstandard }}}>
                        <a>{token.tokenstandard ?? 'N/A'}</a>
                    </Link>
                </div>
                <div className={styles.cardleft}>Number of Holders:</div>
                <div className={styles.cardright}>{countHolders ?? 'N/A'}</div>
                <div className={styles.cardleft}>Domain: </div>
                <div className={styles.cardright}>
                    <a href={`${formatExternalLink(token.domain)}`}
                    rel="noopener noreferrer">
                        {token.domain ?? 'N/A'}
                    </a>
                </div>
                <div className={styles.cardleft}>Owner: </div>
                <div className={styles.cardright}>
                    <Link href={{pathname: '/address/[address]', query: { address: token.owner }}}>
                        <a>{token.owner ?? 'N/A'}</a>
                    </Link>
                </div>
                <div className={styles.cardleft}>Total Supply:</div>
                <div className={styles.cardright}>{Number(token.totalsupply / (10 ** token.decimals)).toLocaleString()} ({Number(token.totalsupply).toLocaleString()})</div>
                <div className={styles.cardleft}>Max Supply: </div>
                <div className={styles.cardright}>{Number(token.maxsupply / (10 ** token.decimals)).toLocaleString()} ({Number(token.maxsupply).toLocaleString()})</div>
                <div className={styles.cardleft}>Decimals: </div>
                <div className={styles.cardright}>{token.decimals ?? 'N/A'}</div>
                <div className={styles.cardleft}>Is Burnable:</div>
                <div className={styles.cardright}>{token?.isburnable?.toString() ?? 'N/A'}</div>
                <div className={styles.cardleft}>Is Mintable: </div>
                <div className={styles.cardright}>{token?.ismintable?.toString() ?? 'N/A'}</div>
                <div className={styles.cardleft}>Is Utility: </div>
                <div className={styles.cardright}>{token?.isutility?.toString() ?? 'N/A'}</div>
            </div>
        </div>
    )
}

function formatExternalLink(url: string) {
    if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
    }
    return url
}

export default Token