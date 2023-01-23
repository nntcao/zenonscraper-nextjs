import Image from 'next/image'
import Link from 'next/link'
import * as db from '../services/db'
import styles from './Home.module.scss'
import * as time from '../utils/time'
import Layout from '../components/Layout/Layout'
import Searchbar from '../components/Searchbar/Searchbar'
import AvgPlasmaPerDayChart from '../components/AveragePlasmaChart/AvgPlasmaPerDay'
import TransactionsPerDayChart from '../components/AccountBlockTable/TransactionsChart/TransactionsPerDay'

function Home(props: any) {
  return (
      <section className={styles.main}>
        <div className={styles.cards}>
          <div className={styles.card}>
            <h2 className={styles.title}>ZenonScraper is Closing Down</h2>
            <p className={styles.cardTitle}>
              January 23rd, 2023
            </p>
            <br />
            <p className={styles.cardTitle}>
              I am saddened to say that as of today, ZenonScraper will be closing down shop. 
            </p>
            <br />
            <p className={styles.cardTitle}>
              I did not expect the site to receive so much traffic or recognition, and I sincerely appreciate you, the user, for continuing to use my website to monitor transactions across the Zenon Network.
            </p>
            <br />
            <p className={styles.cardTitle}>
              However, I am closing the site down for the following reasons: 
              <br />
              - maintenence and upkeep issues
              <br />
              - unaddressed data inaccuracies 
            </p>
            <br />
            <p className={styles.cardTitle}>
              To explore the Zenon Network, I encourage using the <a href="https://explorer.zenon.org/" className={styles.cardTitle}>official explorer</a> as a more accurate alternative.
            </p>
            <br />
            <p className={styles.cardTitle}>
              Needless to say, I thank you for the support over the past year. If you would like to reach me, I am available on <a className={styles.cardTitle} href="https://t.me/vovi_z">Telegram</a>.
            </p>
            <br />
            <p className={styles.cardTitle}>
              Sincerely, 
              <br />
            </p>
            <p className={styles.cardTitle}>
              vovi__z
            </p>
          </div>
        </div>
      </section>
  )
}

export default Home
