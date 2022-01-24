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
                <h1>Error 404! Search not found.</h1>
                <Link href='/'>
                    <a className={styles.text}>Return to Home Page</a>
                </Link>
            </div>
        </Layout>
    )
}