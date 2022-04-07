import Table from '../../GenericComponents/Table/Table'
import FirstColumn from './FirstColumn/FirstColumn'
import styles from './LatestBlocksTable.module.scss'
import SecondColumn from './SecondColumn/SecondColumn'
import ThirdColumn from './ThirdColumn/ThirdColumn'

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
        },
        {
            height: 144358,
            miner: 'spaghetti',
            value: 2.345778,
        },
        {
            height: 144358,
            miner: 'spaghetti',
            value: 2.345778,
        },
        {
            height: 144358,
            miner: 'spaghetti',
            value: 2.345778,
        },
        {
            height: 144358,
            miner: 'spaghetti',
            value: 2.345778,
        },
    ]

    let formattedData = dummyData.map(data => {
        return {
            col1: <FirstColumn height={data.height} timestamp={"45s ago"}/>,
            col2: <SecondColumn producer={data.miner} txnCount={3} time={"10s"}/>,
            col3: <ThirdColumn amount={data.value}/>,
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