import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import styles from './Layout.module.scss'
import Spacer from '../Spacer/Spacer'

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