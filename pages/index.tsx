import Image from 'next/image'
import Link from 'next/link'
import * as db from '../services/db'
import styles from './Home.module.scss'
import * as time from '../utils/time'
import Layout from '../components/Layout'
import Searchbar from '../components/Searchbar'

export async function getServerSideProps() {
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
      momentumList: momentumQueryResult?.rows,
      accountBlockList: accountBlockQueryResult?.rows
    }
  }
}

function Home(props: any) {

  return (
    <Layout>
      <div className={styles.main}>
        <div className={styles.titlebox}>
          <h1 className={styles.title}>ZENON SCRAPER</h1>
          <h2 className={styles.subtitle}>Community explorer for the <a href='https://www.zenon.network' className={styles.emphasis}>Network of Momentum</a></h2>
        </div>
        <Searchbar />
        <div className={styles.cards}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Latest Momentums</h2>
            {
              props.momentumList.map((momentum: any) => {
                return <MomentumComponent momentum={momentum} key={momentum.hash}/>
              })
            }
          </div>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Latest Account Blocks/Transactions</h2>
            {
              props.accountBlockList.map((accountblock: any) => {
                return <AccountBlockComponent accountblock={accountblock} key={accountblock.hash}/>
                }
              )
            }
          </div>
        </div>
      </div>
    </Layout>
  )
}

function MomentumComponent({ momentum }) {
  return (
    <div>
     <hr/>
     <div className={styles.row} >
       <div className={styles.leftrow}>
          <div>
            <span>Height: </span>
            <Link href={{pathname: '/momentum/[momentum]', query: { momentum: momentum.height }}}>
              <a>{momentum.height}</a>
            </Link>
          </div>
          <span className={styles.time}>{time.timeConverter(momentum.timestamp).toString()}</span>
       </div>
       <div className={styles.middlerow}>
          <span className={styles.producer}>Producer:&ensp;</span>
          <Link href={{pathname: '/address/[address]', query: { address: momentum.producer }}}>
            <a className={styles.truncate}> {momentum.producer}</a>
          </Link>
       </div>
       <div className={styles.rightrow}>
         {momentum.countblocks} Txs
       </div>
     </div>
   </div>
  )
}

function AccountBlockComponent({ accountblock }) {
  return (
    <div>
      <hr/>
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
