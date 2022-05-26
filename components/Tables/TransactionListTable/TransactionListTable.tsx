import Pagination from '../../GenericComponents/Pagination/Pagination'
import Subtitle from '../../GenericComponents/Subtitle/Subtitle'
import Table from '../../GenericComponents/Table/Table'
import Title from '../../GenericComponents/Title/Title'
import styles from './TransactionListTable.module.scss'

export default function TransactionListTable(props) {
    return (
        <>
            <Table title={
                <div className={styles.tableTitle}>
                    <div className={styles.tableHeader}>
                        <Title>Confirmed Transactions</Title>
                        <Subtitle>Displaying 1 - 25</Subtitle>
                    </div>
                    <Pagination currentPage={1} lastPage={1} onLastClick='' onFirstClick='' onBackButtonClick='' onForwardButtonClick=''/>
                </div>
            }>
            </Table>
        </>
    )
}