import Image from 'next/image'
import Link from 'next/link'
import * as db from '../services/db'
import styles from './Home.module.scss'
import * as time from '../utils/time'
import Layout from '../components/Layout'
import Searchbar from '../components/Searchbar'

export async function getServerSideProps({ req, res}) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  const momentumQueryResult = await db.query(`
    SELECT momentum.height, momentum.hash, momentum.timestamp, momentum.producer, a.countblocks 
    FROM (SELECT m.hash, COUNT(accountblock.hash) AS countblocks FROM
      (SELECT momentum.hash
      FROM momentum
      ORDER BY height DESC
      LIMIT 10) AS m
      LEFT OUTER JOIN accountblock
      ON m.hash = accountblock.momentumhash
      GROUP BY m.hash) as a
      INNER JOIN momentum 
      ON a.hash = momentum.hash
      ORDER BY momentum.height DESC
  `)
  const accountBlockQueryResult = await db.query(`
    SELECT accountblock.hash, momentum.timestamp, accountblock.address, accountblock.toaddress, accountblock.amount, token.symbol, token.decimals
    FROM accountblock
      INNER JOIN momentum 
      ON accountblock.momentumhash = momentum.hash
      INNER JOIN token
      ON accountblock.tokenstandard = token.tokenstandard
    ORDER BY momentum.timestamp DESC, accountblock.hash
    LIMIT 10
  `)

  return {
    props: {
      momentumList: momentumQueryResult?.rows ?? null,
      accountBlockList: accountBlockQueryResult?.rows ?? null
    }
  }
}

function Home(props: any) {
  return (
    <Layout>
      <div className={styles.main}>
        <div className={styles.titlebox}>
          <h2 className={styles.subtitle}>Zenon Scraper - community blockchain explorer</h2>
        </div>
        <div className={styles.searchBarWrapper}>
          <Searchbar /> 
        </div>
        <div className={styles.cards}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Latest Momentums</h2>
            {
              props.momentumList.map((momentum: any) => {
                return <MomentumComponent momentum={momentum} key={momentum.hash}/>
              })
            }
            <Link href="/momentumlist/1">
              <a className={styles.seeMore}>See more...</a>
            </Link>
          </div>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Latest Account Blocks/Transactions</h2>
            {
              props.accountBlockList.map((accountblock: any) => {
                return <AccountBlockComponent accountblock={accountblock} key={accountblock.hash}/>
                }
              )
            }
            <Link href="/accountblocklist/1">
              <a className={styles.seeMore}>See more...</a>
            </Link>
          </div>
          <div className={styles.card}>
            <div className={styles.cardTitle}>
              Tokens
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

function MomentumComponent({ momentum }) {
  return (
    <div>
     <div className={styles.rowMomentum} >
       <div className={styles.leftrow}>
          <Link href={{pathname: '/momentum/[momentum]', query: { momentum: momentum.height }}}>
            <a>{momentum.height}</a>
          </Link>
          <span>{time.timeConverter(momentum.timestamp).toString()}</span>
       </div>
       <div className={styles.rightrow}>
        <MomentumTransactionsComponent momentum={momentum}/>
       </div>
     </div>
   </div>
  )
}

function MomentumTransactionsComponent({momentum}) {
  if (momentum.countblocks > 0) {
    return (
      <Link href={{pathname: '/momentum/[momentum]/[page]', query: { momentum: momentum.height, page: 1 }}}>
        <a>{momentum.countblocks} Txs</a>
      </Link>
    )
  }
  return (
    <>
      {momentum.countblocks} Txs
    </>
  )
}

function AccountBlockComponent({ accountblock }) {
  return (
    <div>
      <div className={styles.row}>
        <div className={styles.leftrow}>
          <span className={styles.truncate}>
            <Link href={{pathname: '/accountblock/[accountblock]', query: { accountblock: accountblock.hash }}}>
              <a>{accountblock.hash}</a>
            </Link>
          </span>
          <span className={styles.time}>{time.timeConverter(accountblock.timestamp)}</span>
        </div>
        <div className={styles.middlerow}>
          From:&ensp;
          <Link href={{pathname: '/address/[address]', query: { address: accountblock.address }}}>
            <a className={styles.truncate}>{accountblock.address}&ensp;</a>
          </Link>
          To:&ensp;
          <Link href={{pathname: '/address/[address]', query: { address: accountblock.toaddress }}}>
            <a className={styles.truncate}>{accountblock.toaddress}</a> 
          </Link>
        </div>
        <div className={styles.rightrow}>
          <span className={styles.amount}>{accountblock?.symbol ? (Math.round(accountblock.amount / (10 ** accountblock.decimals) * 100) / 100) : 'N/A'}</span> 
          <Link href={{pathname: '/token/[token]', query: { token: accountblock.symbol }}}>
            <a> {accountblock.symbol}</a>
          </Link>
        </div>
      </div>
   </div>
  )
}

export default Home
