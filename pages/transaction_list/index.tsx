import TransactionListTable from "../../components/Tables/TransactionListTable/TransactionListTable"
import Footer from "../../components/Sections/Footer/Footer"
import Header from "../../components/Sections/Header/Header"



function TransactionList(props) {



    return (
        <>
            <Header />
            <section>
                <TransactionListTable />
            </section>
            <Footer />
        </>
    )
}

export default TransactionList