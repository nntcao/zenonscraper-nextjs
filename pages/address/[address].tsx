import * as db from '../../services/db'
import * as time from '../../utils/time'
import ErrorPage from '../404'
import styles from './address.module.scss'
import Layout from '../../components/Layout/Layout'
import Link from 'next/link'
import Searchbar from '../../components/Searchbar/Searchbar'
import AccountBlockTable from '../../components/AccountBlockTable/AccountBlockTable'
import BigNumber from "bignumber.js";

export async function getServerSideProps(context) {
    context.res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )

    const searchString: string = context.params.address
    const addressQuery = await db.query(`
        SELECT address FROM address WHERE address = $1
    `, [searchString])
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
            LIMIT 10
        ) AS b
        INNER JOIN token
        ON b.tokenstandard = token.tokenstandard
        ORDER BY b.momentumheight DESC
    `, [searchString])
    const balanceQuery = await db.query(`
        SELECT *
        FROM (
            SELECT * FROM balance 
            WHERE address = $1) AS b
            INNER JOIN token
            ON token.tokenstandard = b.tokenstandard
    `, [searchString])

    let addressAlternative = null
    if (searchString.substring(0, 3).toLowerCase() === 'z1q' && searchString.length === 40) {
        addressAlternative = {
            address: searchString
        }
    }
    return {
        props: {
            address: addressQuery.rows[0] ?? addressAlternative,
            accountBlocks: accountBlockQuery?.rows ?? null,
            balances: balanceQuery?.rows ?? null
        }
    }
}

function Address({ address, accountBlocks, balances }) {
    if (!address) {
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
                                <h2 className={styles.cardTitle}>Address <span className={`${styles.cardTitle} ${styles.breakAll}`}>{address.address}</span></h2>
                            </div>
                        </div>
                        <div className={styles.cardbody}>
                            <Balance balances={balances} />
                            <div className={styles.cardleft}>Value:</div>
                            <div className={styles.cardright}></div>
                            <div className={styles.cardright}>
                                <Link href={{ pathname: '/api/csv', query: { address: address.address }}}>CSV Export Non-Zero Transactions</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <div className={styles.cardHeaderLeft}>
                            <h2 className={styles.cardTitle}>Recent Transactions</h2>
                            <h2 className={styles.cardSubtitle}>Displaying 1-10</h2>
                        </div>
                    </div>
                    <AccountBlockTable accountBlocks={accountBlocks} />
                    {accountBlocks[0] && <Link href={{ pathname: '/address/[address]/[page]', query: { address: address.address, page: 1 } }}>
                        <a className={styles.seeMore}>See more</a>
                    </Link>}
                </div>
            </div>
        </Layout>
    )
}

function Balance({ balances }) {
    if (!balances || balances === null || balances.length === 0) {
        return (
            <>
                <div className={styles.cardleft}>Balance:</div>
                <div className={styles.cardright}>None</div>
            </>
        )
    }

    return (
        <>
            <div className={styles.cardleft}>Balance:</div>
            <div className={styles.cardbalance}>
                {balances.map(balance => {
                    return (
                        <div className={styles.cardright} key={`${balance.tokenstandard} ${balance.amount}`}>
                            {
                                // @ts-ignore
                                new BigNumber(balance.balance) / (new BigNumber(10) ** new BigNumber(balance.decimals))
                            }
                            <Link href={{ pathname: '/token/[token]', query: { token: balance.tokenstandard } }}>
                                <a className={styles.cardright}> {balance.symbol}</a>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </>

    )
}

export default Address