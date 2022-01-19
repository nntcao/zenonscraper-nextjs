import Layout from '../../components/Layout'
import styles from './Donate.module.scss'

function Donate() {
    return (
        <Layout>
            <div className={styles.main}>
                <div className={styles.content}>
                    <div className={styles.card}>
                        <h1 className={styles.subtitle}>Donate</h1>
                        <hr/>
                        <ul className={styles.list}>
                            <li className={styles.listitem}> <span className={styles.emphasis}>Bitcoin:</span> bc1qtm2r0ycwxta0plg9lsu8cxr6j89rvuec4n7vre</li>
                            <li className={styles.listitem}><span className={styles.emphasis}>ERC20:</span> 0xDAa2601103c49968DDE48a18C0C2d84140121A90</li>
                            <li className={styles.listitem}><span className={styles.emphasis}>Zenon Network:</span> z1qq7fculraf68t22jazhg92y8epsga026d7kwv5</li>
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default Donate