import Table from '../../GenericComponents/Table/Table'
import styles from './LatestBlocksTable.module.scss'
import BoundedTextbox from '../../GenericComponents/BoundedTextbox/BoundedTextbox'
import SubtextSemibold from '../../GenericComponents/SubtextSemibold/SubtextSemibold'
import TextGlow from '../../GenericComponents/TextGlow/TextGlow'
import TextSemibold from '../../GenericComponents/TextSemibold/TextSemibold'
import RoundedSquare from '../../Icons/RoundedSquare/RoundedSquare'

export default function LatestBlocksTable(props) {
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
        }
    ]

    let formattedData = dummyData.map(data => {
        return {
            col1:         
                <div className={styles.col1}>
                    <RoundedSquare>Mn</RoundedSquare>
                    <div className={styles.text}>
                        <TextSemibold><TextGlow>{ data.height }</TextGlow></TextSemibold>
                        <SubtextSemibold>{ data.timestamp }</SubtextSemibold>
                    </div>
                </div>,
            col2:         
                <div className={styles.col2}>
                    <TextSemibold>Producer <TextGlow>{data.miner}</TextGlow></TextSemibold>
                    <SubtextSemibold> <TextGlow>{data.txnCount} txns</TextGlow> in {data.time}</SubtextSemibold>
                </div>,
            col3: <BoundedTextbox>{data.value} ZNN</BoundedTextbox>,
        }
    })

    return (
        <Table title='Latest Blocks'
            fields={fields}
            header={false}
            data={formattedData}
        >
        </Table>

    )
}