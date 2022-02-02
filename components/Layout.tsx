import Header from './Header'
import Footer from './Footer'
import styles from './Layout.module.scss'
import Spacer from './Spacer'

export default function Layout({ children }) {
    return (
        <div className={styles.pagecontainer}>
            <Header />
            <main className={styles.main}>{children}</main>
            <Spacer />
            <Footer />
        </div>
    )
}