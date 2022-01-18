import * as db from '../../services/db'
import * as time from '../../utils/time'
import ErrorPage from '../404'
import styles from './momentum.module.scss'
import Layout from '../../components/Layout'
import Link from 'next/link'
import Searchbar from '../../components/Searchbar'

export async function getServerSideProps(context) {
    const searchString: string = context.params.momentum
    if (isNaN(Number(searchString))) {
        const momentumQuery = await db.query(`
            SELECT momentum.hash, momentum.version, momentum.height, momentum.timestamp, 
                momentum.previoushash, momentum.data, momentum.changeshash, momentum.publickey, 
                momentum.signature, momentum.producer, momentum.chainidentifier, COUNT(accountblock.hash) as countblocks
            FROM momentum
                LEFT JOIN accountblock
                ON accountblock.momentumhash = momentum.hash
                WHERE momentum.hash = $1
                GROUP BY momentum.hash
        `, [searchString])
        return { 
            props: {
                momentumInformation: momentumQuery?.rows[0] ?? null
            }
        }
    } else {
        const momentumQuery = await db.query(`
        SELECT momentum.hash, momentum.version, momentum.height, momentum.timestamp, 
            momentum.previoushash, momentum.data, momentum.changeshash, momentum.publickey, 
            momentum.signature, momentum.producer, momentum.chainidentifier, COUNT(accountblock.hash) as countblocks
        FROM momentum 
            LEFT JOIN accountblock
			ON accountblock.momentumhash = momentum.hash
            WHERE momentum.height = $1
            GROUP BY momentum.hash
            `, [searchString])
        return { 
            props: {
                momentumInformation: momentumQuery?.rows[0] ?? null
            }
        }
    }
}

function Momentum(props: any) {
    const momentum = props.momentumInformation
    if (!momentum) {
        return (
            <ErrorPage />
        )
    }
    return (
        <Layout>
            <div className={styles.main}>
                <Searchbar />
                <div className={styles.card}>
                    <h2 className={styles.cardTitle}>Momentum #{momentum.height}</h2>
                    <hr className={styles.hr}/>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Height</div>
                        <div className={styles.rowright}>
                            <Link href={{pathname: '/momentum/[momentum]', query: { momentum: momentum.height }}}>
                                <a>{momentum.height}</a>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Hash: </div>
                        <div className={styles.rowright}>
                            <Link href={{pathname: '/momentum/[momentum]', query: { momentum: momentum.hash }}}>
                                <a>{momentum.hash}</a>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Timestamp: </div>
                        <div className={styles.rowright}>{momentum.timestamp} ({time.timeConverter(momentum.timestamp)})</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>No. AccountBlocks/Txs</div>
                        <div className={styles.rowright}>{momentum.countblocks}</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Producer: </div>
                        <div className={styles.rowright}>
                            <Link href={{pathname: '/address/[address]', query: { address: momentum.producer }}}>
                                <a>{momentum.producer}</a>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Data: </div>
                        <div className={styles.rowright}>{momentum.data}</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Previous Hash: </div>
                        <div className={styles.rowright}>
                            <Link href={{pathname: '/momentum/[momentum]', query: { momentum: momentum.previoushash }}}>
                                <a>{momentum.previoushash}</a>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Public Key: </div>
                        <div className={styles.rowright}>{momentum.publickey}</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Signature: </div>
                        <div className={styles.rowright}>{momentum.signature}</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Chain Identifier: </div>
                        <div className={styles.rowright}>{momentum.chainidentifier}</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Version: </div>
                        <div className={styles.rowright}>{momentum.version}</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Changes Hash</div>
                        <div className={styles.rowright}>{momentum.changeshash}</div>
                    </div>
                </div>
                <div className={styles.choices}>
                    <Link href={{pathname: '/momentum/[momentum]', query: { momentum: momentum.height - 1 }}}>
                        <a>Previous Momentum</a>
                    </Link>
                    <br />
                    <Link href={{pathname: '/momentum/[momentum]', query: { momentum: momentum.height + 1 }}}>
                        <a>Next Momentum</a>
                    </Link>
                </div>
            </div>
        </Layout>
    )
}

export default Momentum