import Header from './Header'
import Footer from './Footer'
import styles from './Layout.module.scss'

export default function Layout({ children }) {
    return (
        <div className={styles.pagecontainer}>
            <Header />
            <main className={styles.main}>{children}</main>
            <Footer />
        </div>
    )
}