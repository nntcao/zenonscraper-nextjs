import Layout from '../components/Layout'
import styles from './404.module.scss'
import Link from 'next/link'

export default function ErrorPage() {
    return (
        <Layout>
            <div className={styles.main}>
                <h1>Error 404! Search not found.</h1>
                <Link href='/'>
                    <a className={styles.text}>Return to Home Page</a>
                </Link>
            </div>
        </Layout>
    )
}