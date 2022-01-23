import * as db from '../../services/db'
import * as time from '../../utils/time'
import ErrorPage from '../404'
import styles from './address.module.scss'
import Layout from '../../components/Layout'
import Link from 'next/link'
import Searchbar from '../../components/Searchbar'
import AccountBlockTable from '../../components/AccountBlockTable'

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
            ORDER BY timestamp DESC, a.hash
            LIMIT 10
        ) AS b
        INNER JOIN token
        ON b.tokenstandard = token.tokenstandard
    `, [searchString])
    const balanceQuery = await db.query(`
        SELECT *
        FROM (
            SELECT * FROM balance 
            WHERE address = $1) AS b
            INNER JOIN token
            ON token.tokenstandard = b.tokenstandard
    `, [searchString])
    return { 
        props: {
            address: addressQuery.rows[0] ?? null,
            accountBlocks: accountBlockQuery?.rows ?? null,
            balances: balanceQuery?.rows ?? null
        }
    }
}

function Address({ address, accountBlocks, balances}) {
    if (!address) {
        return (
            <ErrorPage />
        )
    }
    
    return (
        <Layout>
            <div className={styles.main}>
                <Searchbar />
                <div className={styles.card}>
                    <div className={styles.titleline}>
                        <h2 className={styles.cardTitle}>Address {address.address}</h2>
                    </div>
                    <hr />
                    <div className={styles.cardbody}>
                        <Balance balances={balances}/>
                        <div className={styles.cardleft}>Value:</div>
                        <div className={styles.cardright}></div>
                    </div>
                </div>
                <h2 className={styles.tableTitle}>Recent Account Blocks/Transactions</h2>
                <hr/>
                <AccountBlockTable accountBlocks={accountBlocks} />
            </div>
        </Layout>
    )
}

function Balance( { balances } ) {
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
                        <div key={`${balance.tokenstandard} ${balance.amount}`}> 
                            {Number(balance.balance) / (10 ** balance.decimals)} 
                            <Link href={{pathname: '/token/[token]', query: { token: balance.tokenstandard }}}>
                                <a> {balance.symbol}</a>
                            </Link>
                        </div>   
                    )
                })}
            </div>
        </>
        
    )
}

export default Address