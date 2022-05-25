import Subtitle from '../../GenericComponents/Subtitle/Subtitle'
import Table from '../../GenericComponents/Table/Table'
import Title from '../../GenericComponents/Title/Title'
import styles from './TransactionListTable.module.scss'

export default function TransactionListTable(props) {
    return (
        <>
            <Title>Confirmed Transactions</Title>
            <Subtitle>Displaying 1 - 25</Subtitle>
            <Table />
        </>
    )
}