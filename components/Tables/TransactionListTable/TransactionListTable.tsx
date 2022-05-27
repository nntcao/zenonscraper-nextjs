import Pagination from '../../GenericComponents/Pagination/Pagination'
import Subtitle from '../../GenericComponents/Subtitle/Subtitle'
import Table from '../../GenericComponents/Table/Table'
import Title from '../../GenericComponents/Title/Title'
import styles from './TransactionListTable.module.scss'
import Card from '../../GenericComponents/Card/Card'

export default function TransactionListTable(props) {

    const fields = [
        {
            label: 'Type',
            value: 'type',
        },
        {
            label: 'Momentum Height',
            value: 'height',
        },
        {
            label: 'Age',
            value: 'age',
        },
        {
            label: 'Hash',
            value: 'hash',
        },
        {
            label: 'From',
            value: 'from',
        },
        {
            label: 'To',
            value: 'to',
        },
        {
            label: 'Amount',
            value: 'amount',
        },
        {
            label: 'Token',
            value: 'token',
        },
        {
            label: 'Plasma',
            value: 'plasma',
        }
    ]

    const dummyData = [
        {
            type: "Claim",
            height: 10000,
            age: "6min 51sec",
            hash: "0xkasdfjhslkafjlsdkjfdf",
            from: "z1qdklsjfaklsdjfkldsahf",
            to: "z1qakdshfkjsdhfkjsdhfdsa",
            amount: 10,
            token: "zts1qqqqqqqty",
            plasma: 21000,
        },
        {
            type: "Claim",
            height: 10000,
            age: "6min 51sec",
            hash: "0xkasdfjhslkafjlsdkjfdf",
            from: "z1qdklsjfaklsdjfkldsahf",
            to: "z1qakdshfkjsdhfkjsdhfdsa",
            amount: 10,
            token: "zts1qqqqqqqty",
            plasma: 21000,
        },
        {
            type: "Claim",
            height: 10000,
            age: "6min 51sec",
            hash: "0xkasdfjhslkafjlsdkjfdf",
            from: "z1qdklsjfaklsdjfkldsahf",
            to: "z1qakdshfkjsdhfkjsdhfdsa",
            amount: 10,
            token: "zts1qqqqqqqty",
            plasma: 21000,
        },
        {
            type: "Claim",
            height: 10000,
            age: "6min 51sec",
            hash: "0xkasdfjhslkafjlsdkjfdf",
            from: "z1qdklsjfaklsdjfkldsahf",
            to: "z1qakdshfkjsdhfkjsdhfdsa",
            amount: 10,
            token: "zts1qqqqqqqty",
            plasma: 21000,
        },
        {
            type: "Claim",
            height: 10000,
            age: "6min 51sec",
            hash: "0xkasdfjhslkafjlsdkjfdf",
            from: "z1qdklsjfaklsdjfkldsahf",
            to: "z1qakdshfkjsdhfkjsdhfdsa",
            amount: 10,
            token: "zts1qqqqqqqty",
            plasma: 21000,
        },
        {
            type: "Claim",
            height: 10000,
            age: "6min 51sec",
            hash: "0xkasdfjhslkafjlsdkjfdf",
            from: "z1qdklsjfaklsdjfkldsahf",
            to: "z1qakdshfkjsdhfkjsdhfdsa",
            amount: 10,
            token: "zts1qqqqqqqty",
            plasma: 21000,
        },
        {
            type: "Claim",
            height: 10000,
            age: "6min 51sec",
            hash: "0xkasdfjhslkafjlsdkjfdf",
            from: "z1qdklsjfaklsdjfkldsahf",
            to: "z1qakdshfkjsdhfkjsdhfdsa",
            amount: 10,
            token: "zts1qqqqqqqty",
            plasma: 21000,
        },
        {
            type: "Claim",
            height: 10000,
            age: "6min 51sec",
            hash: "0xkasdfjhslkafjlsdkjfdf",
            from: "z1qdklsjfaklsdjfkldsahf",
            to: "z1qakdshfkjsdhfkjsdhfdsa",
            amount: 10,
            token: "zts1qqqqqqqty",
            plasma: 21000,
        },
        {
            type: "Claim",
            height: 10000,
            age: "6min 51sec",
            hash: "0xkasdfjhslkafjlsdkjfdf",
            from: "z1qdklsjfaklsdjfkldsahf",
            to: "z1qakdshfkjsdhfkjsdhfdsa",
            amount: 10,
            token: "zts1qqqqqqqty",
            plasma: 21000,
        },
        {
            type: "Claim",
            height: 10000,
            age: "6min 51sec",
            hash: "0xkasdfjhslkafjlsdkjfdf",
            from: "z1qdklsjfaklsdjfkldsahf",
            to: "z1qakdshfkjsdhfkjsdhfdsa",
            amount: 10,
            token: "zts1qqqqqqqty",
            plasma: 21000,
        },
        {
            type: "Claim",
            height: 10000,
            age: "6min 51sec",
            hash: "0xkasdfjhslkafjlsdkjfdf",
            from: "z1qdklsjfaklsdjfkldsahf",
            to: "z1qakdshfkjsdhfkjsdhfdsa",
            amount: 10,
            token: "zts1qqqqqqqty",
            plasma: 21000,
        },
        {
            type: "Claim",
            height: 10000,
            age: "6min 51sec",
            hash: "0xkasdfjhslkafjlsdkjfdf",
            from: "z1qdklsjfaklsdjfkldsahf",
            to: "z1qakdshfkjsdhfkjsdhfdsa",
            amount: 10,
            token: "zts1qqqqqqqty",
            plasma: 21000,
        },
        {
            type: "Claim",
            height: 10000,
            age: "6min 51sec",
            hash: "0xkasdfjhslkafjlsdkjfdf",
            from: "z1qdklsjfaklsdjfkldsahf",
            to: "z1qakdshfkjsdhfkjsdhfdsa",
            amount: 10,
            token: "zts1qqqqqqqty",
            plasma: 21000,
        },
        {
            type: "Claim",
            height: 10000,
            age: "6min 51sec",
            hash: "0xkasdfjhslkafjlsdkjfdf",
            from: "z1qdklsjfaklsdjfkldsahf",
            to: "z1qakdshfkjsdhfkjsdhfdsa",
            amount: 10,
            token: "zts1qqqqqqqty",
            plasma: 21000,
        },
        {
            type: "Claim",
            height: 10000,
            age: "6min 51sec",
            hash: "0xkasdfjhslkafjlsdkjfdf",
            from: "z1qdklsjfaklsdjfkldsahf",
            to: "z1qakdshfkjsdhfkjsdhfdsa",
            amount: 10,
            token: "zts1qqqqqqqty",
            plasma: 21000,
        },
        {
            type: "Claim",
            height: 10000,
            age: "6min 51sec",
            hash: "0xkasdfjhslkafjlsdkjfdf",
            from: "z1qdklsjfaklsdjfkldsahf",
            to: "z1qakdshfkjsdhfkjsdhfdsa",
            amount: 10,
            token: "zts1qqqqqqqty",
            plasma: 21000,
        },
        {
            type: "Claim",
            height: 10000,
            age: "6min 51sec",
            hash: "0xkasdfjhslkafjlsdkjfdf",
            from: "z1qdklsjfaklsdjfkldsahf",
            to: "z1qakdshfkjsdhfkjsdhfdsa",
            amount: 10,
            token: "zts1qqqqqqqty",
            plasma: 21000,
        },
        {
            type: "Claim",
            height: 10000,
            age: "6min 51sec",
            hash: "0xkasdfjhslkafjlsdkjfdf",
            from: "z1qdklsjfaklsdjfkldsahf",
            to: "z1qakdshfkjsdhfkjsdhfdsa",
            amount: 10,
            token: "zts1qqqqqqqty",
            plasma: 21000,
        },
        {
            type: "Claim",
            height: 10000,
            age: "6min 51sec",
            hash: "0xkasdfjhslkafjlsdkjfdf",
            from: "z1qdklsjfaklsdjfkldsahf",
            to: "z1qakdshfkjsdhfkjsdhfdsa",
            amount: 10,
            token: "zts1qqqqqqqty",
            plasma: 21000,
        },
        {
            type: "Claim",
            height: 10000,
            age: "6min 51sec",
            hash: "0xkasdfjhslkafjlsdkjfdf",
            from: "z1qdklsjfaklsdjfkldsahf",
            to: "z1qakdshfkjsdhfkjsdhfdsa",
            amount: 10,
            token: "zts1qqqqqqqty",
            plasma: 21000,
        },
        {
            type: "Claim",
            height: 10000,
            age: "6min 51sec",
            hash: "0xkasdfjhslkafjlsdkjfdf",
            from: "z1qdklsjfaklsdjfkldsahf",
            to: "z1qakdshfkjsdhfkjsdhfdsa",
            amount: 10,
            token: "zts1qqqqqqqty",
            plasma: 21000,
        },
        {
            type: "Claim",
            height: 10000,
            age: "6min 51sec",
            hash: "0xkasdfjhslkafjlsdkjfdf",
            from: "z1qdklsjfaklsdjfkldsahf",
            to: "z1qakdshfkjsdhfkjsdhfdsa",
            amount: 10,
            token: "zts1qqqqqqqty",
            plasma: 21000,
        },
        {
            type: "Claim",
            height: 10000,
            age: "6min 51sec",
            hash: "0xkasdfjhslkafjlsdkjfdf",
            from: "z1qdklsjfaklsdjfkldsahf",
            to: "z1qakdshfkjsdhfkjsdhfdsa",
            amount: 10,
            token: "zts1qqqqqqqty",
            plasma: 21000,
        },
        {
            type: "Claim",
            height: 10000,
            age: "6min 51sec",
            hash: "0xkasdfjhslkafjlsdkjfdf",
            from: "z1qdklsjfaklsdjfkldsahf",
            to: "z1qakdshfkjsdhfkjsdhfdsa",
            amount: 10,
            token: "zts1qqqqqqqty",
            plasma: 21000,
        },
        {
            type: "Claim",
            height: 10000,
            age: "6min 51sec",
            hash: "0xkasdfjhslkafjlsdkjfdf",
            from: "z1qdklsjfaklsdjfkldsahf",
            to: "z1qakdshfkjsdhfkjsdhfdsa",
            amount: 10,
            token: "zts1qqqqqqqty",
            plasma: 21000,
        },

    ]

    return (
        <Card className={styles.card}>
            <Table 
                title={
                    <div className={styles.tableTitle}>
                        <div className={styles.tableHeader}>
                            <Title>Confirmed Transactions</Title>
                            <Subtitle>Displaying 1 - 25</Subtitle>
                        </div>
                        <Pagination currentPage={1} lastPage={1} onLastClick='' onFirstClick='' onBackButtonClick='' onForwardButtonClick=''/>
                    </div>
                }
                fields={fields}
                data={dummyData}
            >
            </Table>
        </Card>
    )
}