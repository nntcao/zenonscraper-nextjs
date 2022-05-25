import styles from './LatestTransactionsTable.module.scss'
import Table from '../../GenericComponents/Table/Table'
import BoundedTextbox from '../../GenericComponents/BoundedTextbox/BoundedTextbox'
import SubtextSemibold from '../../GenericComponents/SubtextSemibold/SubtextSemibold'
import TextGlow from '../../GenericComponents/TextGlow/TextGlow'
import TextSemibold from '../../GenericComponents/TextSemibold/TextSemibold'
import RoundedSquare from '../../Icons/RoundedSquare/RoundedSquare'
import LinkWrapper from '../../GenericComponents/LinkWrapper/LinkWrapper'
import TextTruncate from '../../GenericComponents/TextTruncate/TextTruncate'
import Subtitle from '../../GenericComponents/Subtitle/Subtitle'

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
            hash: "0x918273kjhwdkqhw",
            from: '0x981kjewr1i2u39018e10w98e',
            to: '0xoiaqweu7918723dqkl1111111111111111111111w091',
            value: 2.345778,
            timestamp: "32s ago",
            token: "ZNN",
        },
        {
            hash: "0x918273kjhwdkqhw",
            from: '0x981kjewr1i2u39018e10w98e',
            to: '0xoiaqweu7918723dqklw091',
            value: 2.345778,
            timestamp: "32s ago",
            token: "ZNN",
        },
        {
            hash: "0x918273kjhwdkqhw",
            from: '0x981kjewr1i2u39018e10w98e',
            to: '0xoiaqweu7918723dqklw091',
            value: 2.345778,
            timestamp: "32s ago",
            token: "ZNN",
        },
        {
            hash: "0x918273kjhwdkqhw",
            from: '0x981kjewr1i2u39018e10w98e',
            to: '0xoiaqweu7918723dqklw091',
            value: 2.345778,
            timestamp: "32s ago",
            token: "ZNN",
        },
        {
            hash: "0x918273kjhwdkqhw",
            from: '0x981kjewr1i2u39018e10w98e',
            to: '0xoiaqweu7918723dqklw091',
            value: 2.345778,
            timestamp: "32s ago",
            token: "ZNN",
        },
    ]

    let formattedData = dummyData.map(data => {
        return {
            col1:
                <div className={styles.col1}>
                    <RoundedSquare>Tx</RoundedSquare>
                    <div className={styles.text}>
                        <TextSemibold>
                            <TextGlow><TextTruncate style={{maxWidth: "121px"}}>{data.hash}</TextTruncate></TextGlow>
                        </TextSemibold>
                        <SubtextSemibold>{data.timestamp}</SubtextSemibold>
                    </div>
                </div>,
            col2:
                <div className={styles.col2}>
                    <TextSemibold style={{whiteSpace: "nowrap"}}>
                        From <TextGlow><TextTruncate style={{maxWidth: "121px"}}>{data.from}</TextTruncate></TextGlow>
                    </TextSemibold> 
                    <TextSemibold style={{whiteSpace: "nowrap"}}>
                        To <TextGlow><TextTruncate style={{maxWidth: "121px"}}>{data.to}</TextTruncate></TextGlow>
                    </TextSemibold> 
                </div>,
            col3: 
                <div className={styles.col3}>
                    <BoundedTextbox>{data.value} {data.token}</BoundedTextbox>
                </div>,
        }
    })

    return (
        <Table title={<Subtitle className={styles.title}>Latest Transactions</Subtitle>}
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