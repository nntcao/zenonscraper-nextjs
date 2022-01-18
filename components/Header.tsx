import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Header.module.scss'

export default function Header() {
    return (
        <nav>
            <Head>
                <title>Zenon Scraper</title>
                <meta name="description" content="Explorer for Zenon Network DAG"/>
                <link rel="icon" href="/favicon.png" />
            </Head>

            <div className={styles.header}>
                <div className={styles.container}>
                    <Link href='/'>
                        <a className={styles.titlelogo}>
                            <Image src="/../public/banner.png" width="126" height="57"/>
                        </a>
                    </Link>
                    <div className={styles.options}>
                        <Link href='/'>
                            <a className={styles.optionsText}>Home</a>
                        </Link>
                        <span className={styles.optionsText}>Blockchain</span>
                        <span className={styles.optionsText}>Tokens</span>
                        <span className={styles.optionsText}>Resources</span>
                    </div>
                </div>
            </div>
       </nav>
    )
}