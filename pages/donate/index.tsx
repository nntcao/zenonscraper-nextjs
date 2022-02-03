import Layout from '../../components/Layout'
import styles from './Donate.module.scss'

function Donate() {
    return (
        <Layout>
            <div className={styles.main}>
                <div className={styles.card}>
                    <div className={styles.cardContent}>
                        <div className={styles.cardHeader}>
                            <h2 className={styles.cardTitle}>Donate</h2>
                        </div>
                        <p className={styles.pageText}>Thank you for your interest in donating! Donations help cover development costs.</p>
                        <p className={styles.pageText}>To donate, please send cryptocurrency to any of the respective addresses below.</p>
                        
                        <ul className={styles.linksList}>
                            <li className={styles.link}> <span className={`${styles.strongText} ${styles.link}`}>Bitcoin:</span> bc1qtm2r0ycwxta0plg9lsu8cxr6j89rvuec4n7vre</li>
                            <li className={styles.link}><span className={`${styles.strongText} ${styles.link}`}>ERC20:</span> 0xDAa2601103c49968DDE48a18C0C2d84140121A90</li>
                            <li className={styles.link}><span className={`${styles.strongText} ${styles.link}`}>Zenon Network:</span> z1qq7fculraf68t22jazhg92y8epsga026d7kwv5</li>
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default Donate