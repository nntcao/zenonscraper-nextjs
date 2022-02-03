import Layout from '../components/Layout'
import styles from './404.module.scss'
import Link from 'next/link'
import Searchbar from '../components/Searchbar'

export default function ErrorPage() {
    return (
        <Layout>
            <div className={styles.main}>
                <div className={styles.searchBarWrapper}>
                    <Searchbar />
                </div>
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <div className={styles.cardHeaderLeft}>
                            <h1 className={styles.cardTitle}>Error 404! Search not found.</h1>
                            <Link href='/'>
                                <a className={styles.cardSubtitle}>Return to Home Page</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}