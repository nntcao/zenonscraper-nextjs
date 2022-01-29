import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Header.module.scss'

export default function Header() {
    return (
        <nav>
            <div className={styles.header}>
                <div className={styles.container}>
                    <Link href='/'>
                        <a className={styles.titlelogo}>
                            <Image src="/banner.png" width="63" height="29" alt="Zenon Scraper Logo"/>
                        </a>
                    </Link>
                    <div className={styles.options}>
                        <Link href='/'>
                            <a className={styles.optionsText}>Home</a>
                        </Link>
                        <Link href='/momentumlist/1'>
                            <a className={styles.optionsText}>Momentums</a>
                        </Link>
                        <Link href='/accountblocklist/1'>
                            <a className={styles.optionsText}>Account Blocks</a>
                        </Link>
                        <Link href='/tokenlist'>
                            <a className={styles.optionsText}>Tokens</a>
                        </Link>
                        <Link href='/resources'>
                            <a className={styles.optionsText}>Resources</a>
                        </Link>
                        <Link href='/donate'>
                            <a className={styles.optionsText}>Donate</a>
                        </Link>
                    </div>
                </div>
            </div>
       </nav>
    )
}