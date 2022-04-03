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
                    
                </div>
            </div>
        </section>
    )
}