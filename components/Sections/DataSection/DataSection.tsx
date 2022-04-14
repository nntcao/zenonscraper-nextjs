import Card from '../../GenericComponents/Card/Card'
import LatestBlocksTable from '../../Tables/LatestBlocksTable/LatestBlocksTable'
import LatestTransactionsTable from '../../Tables/LatestTransactionsTable/LatestTransactionsTable'
import GeneralDashboard from '../GeneralDashboard/GeneralDashboard'
import styles from './DataSection.module.scss'

export default function DataSection(props) {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <GeneralDashboard />
                <div className={styles.charts}>
                    {/* <Chart /> */}
                    {/* <Chart /> */}
                </div>
                <div className={styles.tables}>
                    <Card className={styles.stretchWrapper}
                        style={{
                            paddingLeft: "0px",
                            paddingRight: "0px",
                    }}>
                        <LatestBlocksTable />
                    </Card>
                    <Card className={styles.stretchWrapper}
                        style={{
                            paddingLeft: "0px",
                            paddingRight: "0px",
                    }}>
                        <LatestTransactionsTable />
                    </Card>
                </div>
            </div>
        </section>
    )
}