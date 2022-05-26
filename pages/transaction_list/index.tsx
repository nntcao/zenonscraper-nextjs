import TransactionListTable from "../../components/Tables/TransactionListTable/TransactionListTable"
import Footer from "../../components/Sections/Footer/Footer"
import Header from "../../components/Sections/Header/Header"
import styles from './TransactionList.module.scss'


function TransactionList(props) {



    return (
        <>
            <Header />
            <section className={styles.widthContent}>
                <TransactionListTable />
            </section>
            <Footer />
        </>
    )
}

export default TransactionList