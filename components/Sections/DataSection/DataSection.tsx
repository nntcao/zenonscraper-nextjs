import Table from '../../GenericComponents/Table/Table'
import TableBody from '../../GenericComponents/Table/TableBody/TableBody'
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
                    <div className={styles.stretchWrapper}>
                        <LatestBlocksTable />
                    </div>
                    <div className={styles.stretchWrapper}>
                        <LatestTransactionsTable />
                    </div>
                </div>
            </div>
        </section>
    )
}