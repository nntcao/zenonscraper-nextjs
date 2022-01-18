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
        return { 
            props: {
                tokenInformation: tokenQuery?.rows[0] ?? null
            }
        }
    } else {
        var tokenQuery = await db.query(`
            SELECT * FROM token
            WHERE symbol = $1
        `, [searchString])
        return { 
            props: {
                tokenInformation: tokenQuery?.rows[0] ?? null
            }
        }
    }
}

function Token(props: any) {
    const token = props.tokenInformation
    if (!token) {
        return (
            <ErrorPage />
        )
    }

    return (
        <Layout>
            <div className={styles.main}>
                <span>Token {token.symbol}<span> ({token.tokenstandard})</span></span>
                <hr />
                <div className={styles.card}>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Name: </div>
                        <div className={styles.rowright}>{token.name}</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Symbol: </div>
                        <div className={styles.rowright}>{token.symbol}</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Token Standard:</div>
                        <div className={styles.rowright}>
                            <Link href={{pathname: '/token/[token]', query: { token: token.tokenstandard }}}>
                                <a>{token.tokenstandard}</a>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Domain: </div>
                        <div className={styles.rowright}>
                            <a href={`${formatExternalLink(token.domain)}`}
                            rel="noopener noreferrer">
                                {token.domain}
                            </a>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Owner: </div>
                        <div className={styles.rowright}>
                            <Link href={{pathname: '/address/[address]', query: { address: token.owner }}}>
                                <a>{token.owner}</a>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Total Supply:</div>
                        <div className={styles.rowright}>{Number(token.totalsupply / (10 ** token.decimals)).toLocaleString()} ({Number(token.totalsupply).toLocaleString()})</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Max Supply: </div>
                        <div className={styles.rowright}>{Number(token.maxsupply / (10 ** token.decimals)).toLocaleString()} ({Number(token.maxsupply).toLocaleString()})</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Decimals: </div>
                        <div className={styles.rowright}>{token.decimals}</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Is Burnable:</div>
                        <div className={styles.rowright}>{token.isburnable.toString()}</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Is Mintable: </div>
                        <div className={styles.rowright}>{token.ismintable.toString()}</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Is Utility: </div>
                        <div className={styles.rowright}>{token.isutility.toString()}</div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

function formatExternalLink(url: string) {
    if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
    }
    return url
}

export default Token