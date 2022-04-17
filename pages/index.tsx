import Image from 'next/image'
import Link from 'next/link'
import * as db from '../services/db'
import styles from './Home.module.scss'
import * as time from '../utils/time'
import Layout from '../components/Layout/Layout'
import Searchbar from '../components/Searchbar/Searchbar'
import AvgPlasmaPerDayChart from '../components/AveragePlasmaChart/AvgPlasmaPerDay'
import TransactionsPerDayChart from '../components/AccountBlockTable/TransactionsChart/TransactionsPerDay'

export async function getServerSideProps({ req, res }) {
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

  const tokenQuery = await db.query(`
    SELECT * FROM
        (SELECT token.name, token.symbol, token.tokenstandard, token.totalsupply, token.decimals, COUNT(address) as countholders FROM balance
            INNER JOIN token
            ON token.tokenstandard = balance.tokenstandard
            GROUP BY token.symbol, token.tokenstandard, token.totalsupply, token.decimals) AS b
          ORDER BY b.countholders DESC
          LIMIT 15
  `)

  const plasmaQuery = await db.query(`
    SELECT * FROM 
      (SELECT * FROM plasmaday
      ORDER BY time DESC
      LIMIT 30) as b
    ORDER BY time 
  `)

  const transactionCountQuery = await db.query(`
    SELECT * FROM 
      (SELECT * FROM transactionday
      ORDER BY time DESC
      LIMIT 30) as b
    ORDER BY time 
  `)


  return {
    props: {
      momentumList: momentumQueryResult?.rows ?? null,
      accountBlockList: accountBlockQueryResult?.rows ?? null,
      tokenList: tokenQuery?.rows ?? null,
      plasmaData: plasmaQuery?.rows ?? null,
      transactionData: transactionCountQuery?.rows ?? null
    }
  }
}

function Home(props: any) {
  return (
    <Layout>
      <section className={styles.main}>
        <div className={styles.searchBarWrapper}>
          <div className={styles.titlebox}>
            <h1 className={styles.title}>The Zenon Scraper Blockchain Explorer</h1>
          </div>
          <Searchbar />
        </div>
        <div className={`${styles.cards} ${styles.cardsChart}`}>
          <div className={`${styles.card} ${styles.cardChart}`}>
            <h2 className={styles.cardTitle}>Number of Transactions - Last 30 Days</h2>
            <TransactionsPerDayChart data={props.transactionData} />
          </div>
          <div className={`${styles.card} ${styles.cardChart}`}>
            <h2 className={styles.cardTitle}>Average Plasma Usage - Last 30 Days</h2>
            <AvgPlasmaPerDayChart data={props.plasmaData} />
          </div>
        </div>
        <div className={styles.cards}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Latest Momentums</h2>
            {
              props.momentumList.map((momentum: any) => {
                return <MomentumComponent momentum={momentum} key={momentum.hash} />
              })
            }
            <Link href="/momentumlist/1">
              <a className={styles.seeMore}>See more...</a>
            </Link>
          </div>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Latest Transactions</h2>
            {
              props.accountBlockList.map((accountblock: any) => {
                return <AccountBlockComponent accountblock={accountblock} key={accountblock.hash} />
              }
              )
            }
            <Link href="/accountblocklist/1">
              <a className={styles.seeMore}>See more...</a>
            </Link>
          </div>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Tokens</h2>
            {
              props.tokenList.map((token: any) => {
                return <TokenComponent token={token} key={token.symbol} />
              })
            }
            <Link href="/tokenlist">
              <a className={styles.seeMore}>See more...</a>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}

function TokenComponent({ token }) {
  return (
    <div className={styles.rowMomentum}>
      <div className={styles.leftrow}>
        <Link href={{ pathname: '/token/[token]', query: { token: token.symbol } }}>
          <a>{token.symbol}</a>
        </Link>
      </div>
      <span className={`${styles.rightrow} ${styles.rowSubtext}`}>
        {token.countholders} Holders
      </span>
    </div>
  )
}

function MomentumComponent({ momentum }) {
  return (
    <div>
      <div className={styles.rowMomentum} >
        <div className={styles.leftrow}>
          <div>
            <Link href={{ pathname: '/momentum/[momentum]', query: { momentum: momentum.height } }}>
              <a>{momentum.height}</a>
            </Link>
          </div>
          <span className={styles.rowSubtext}>{`${time.msToFormattedTime(Date.now() - momentum.timestamp * 1000)} ago`}</span>
        </div>
        <div className={styles.rightrow}>
          <MomentumTransactionsComponent momentum={momentum} />
        </div>
      </div>
    </div>
  )
}

function MomentumTransactionsComponent({ momentum }) {
  if (momentum.countblocks > 0) {
    return (
      <Link href={{ pathname: '/momentum/[momentum]/[page]', query: { momentum: momentum.height, page: 1 } }}>
        <a className={styles.rowSubtext}>{momentum.countblocks} Txs</a>
      </Link>
    )
  }
  return (
    <span className={styles.rowSubtext}>
      {momentum.countblocks} Txs
    </span>
  )
}

function AccountBlockComponent({ accountblock }) {
  return (
    <div>
      <div className={styles.row}>
        <div className={styles.leftrow}>
          <span className={styles.truncate}>
            <Link href={{ pathname: '/accountblock/[accountblock]', query: { accountblock: accountblock.hash } }}>
              <a>{accountblock.hash}</a>
            </Link>
          </span>
          <span className={styles.rowSubtext}>{`${time.msToFormattedTime(Date.now() - accountblock.timestamp * 1000)} ago`}</span>
        </div>
        <div className={`${styles.middlerow} ${styles.rowSubtext}`}>
          <div className={styles.middlerowLine}>
            <span>From:&ensp;</span>
            <Link href={{ pathname: '/address/[address]', query: { address: accountblock.address } }}>
              <a className={styles.truncate}>{accountblock.address}&ensp;</a>
            </Link>
          </div>
          <div className={styles.middlerowLine}>
            <span>To:&ensp;</span>
            <Link href={{ pathname: '/address/[address]', query: { address: accountblock.toaddress } }}>
              <a className={styles.truncate}>{accountblock.toaddress}</a>
            </Link>
          </div>
        </div>
        <div className={styles.rightrow}>
          <span className={`${styles.amount} ${styles.rowSubtext}`}>{accountblock?.symbol ? new BigNumber(Math.round(new BigNumber(accountblock.amount) / (new BigNumber(10) ** new BigNumber(accountblock.decimals)) * 100) / 100) : 'N/A'}</span>
          <Link href={{ pathname: '/token/[token]', query: { token: accountblock.symbol } }}>
            <a> {accountblock.symbol}</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
