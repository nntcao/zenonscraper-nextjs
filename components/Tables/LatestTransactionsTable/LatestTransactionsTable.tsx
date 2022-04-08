import styles from './LatestTransactionsTable.module.scss'
import Table from '../../GenericComponents/Table/Table'
import BoundedTextbox from '../../GenericComponents/BoundedTextbox/BoundedTextbox'
import SubtextSemibold from '../../GenericComponents/SubtextSemibold/SubtextSemibold'
import TextGlow from '../../GenericComponents/TextGlow/TextGlow'
import TextSemibold from '../../GenericComponents/TextSemibold/TextSemibold'
import RoundedSquare from '../../Icons/RoundedSquare/RoundedSquare'
import LinkWrapper from '../../GenericComponents/LinkWrapper/LinkWrapper'

export default function LatestTransactionsTable(props) {
    const fields = [
        {
            label: 'Col1',
            value: 'col1',
        },
        {
            label: 'Col2',
            value: 'col2',
        },
        {
            label: 'Col3',
            value: 'col3'
        },
    ]

    let dummyData = [
        {
            height: 144357,
            miner: 'Zygonz',
            value: 2.345778,
            txnCount: 40,
            time: "12s",
            timestamp: "32s ago"
        },
        {
            height: 144357,
            miner: 'Zygonz',
            value: 2.345778,
            txnCount: 40,
            time: "12s",
            timestamp: "32s ago"
        },
        {
            height: 144357,
            miner: 'Zygonz',
            value: 2.345778,
            txnCount: 40,
            time: "12s",
            timestamp: "32s ago"
        },
        {
            height: 144357,
            miner: 'Zygonz',
            value: 2.345778,
            txnCount: 40,
            time: "12s",
            timestamp: "32s ago"
        },
        {
            height: 144357,
            miner: 'Zygonz',
            value: 2.345778,
            txnCount: 40,
            time: "12s",
            timestamp: "32s ago"
        },
    ]

    let formattedData = dummyData.map(data => {
        return {
            col1:
                <div className={styles.col1}>
                    <RoundedSquare>Mn</RoundedSquare>
                    <div className={styles.text}>
                        <TextSemibold><TextGlow>{data.height}</TextGlow></TextSemibold>
                        <SubtextSemibold>{data.timestamp}</SubtextSemibold>
                    </div>
                </div>,
            col2:
                <div className={styles.col2}>
                    <TextSemibold>Producer <TextGlow>{data.miner}</TextGlow></TextSemibold>
                    <SubtextSemibold> <TextGlow>{data.txnCount} txns</TextGlow> in {data.time}</SubtextSemibold>
                </div>,
            col3: 
                <div className={styles.col3}>
                    <BoundedTextbox>{data.value} ZNN</BoundedTextbox>
                </div>,
        }
    })

    return (
        <Table title='Latest Transactions'
            fields={fields}
            header={false}
            data={formattedData}
        >
            <LinkWrapper href="https://www.zenonscraper.com">
                <BoundedTextbox style={{ display: 'block', marginLeft: '16px', marginRight: '16px', marginTop: '7px' }}>
                    View All Blocks
                </BoundedTextbox>
            </LinkWrapper>
        </Table>
    )
}