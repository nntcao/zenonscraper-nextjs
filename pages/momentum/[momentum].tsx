import * as db from '../../services/db'
import * as time from '../../utils/time'
import ErrorPage from '../404'
import styles from './momentum.module.scss'
import Layout from '../../components/Layout'
import Link from 'next/link'
import Searchbar from '../../components/Searchbar'

export async function getServerSideProps(context) {
    context.res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )
    
    const searchString: string = context.params.momentum
    if (isNaN(Number(searchString))) {
        var momentumQuery = await db.query(`
            SELECT momentum.hash, momentum.version, momentum.height, momentum.timestamp, 
                momentum.previoushash, momentum.data, momentum.changeshash, momentum.publickey, 
                momentum.signature, momentum.producer, momentum.chainidentifier, COUNT(accountblock.hash) as countblocks
            FROM momentum
                LEFT JOIN accountblock
                ON accountblock.momentumhash = momentum.hash
                WHERE momentum.hash = $1
                GROUP BY momentum.hash
        `, [searchString])
    } else {
        var momentumQuery = await db.query(`
            SELECT momentum.hash, momentum.version, momentum.height, momentum.timestamp, 
                momentum.previoushash, momentum.data, momentum.changeshash, momentum.publickey, 
                momentum.signature, momentum.producer, momentum.chainidentifier, COUNT(accountblock.hash) as countblocks
            FROM momentum 
                LEFT JOIN accountblock
                ON accountblock.momentumhash = momentum.hash
                WHERE momentum.height = $1
                GROUP BY momentum.hash
        `, [searchString])
    }

    var prevMomentumQuery = await db.query(`
        SELECT 1 FROM momentum WHERE height = $1
    `, [Number(momentumQuery?.rows[0]?.height) - 1])
    var nextMomentumQuery = await db.query(`
        SELECT 1 FROM momentum WHERE height = $1
    `, [Number(momentumQuery?.rows[0]?.height) + 1])

    return { 
        props: {
            momentumInformation: momentumQuery?.rows[0] ?? null,
            prevMomentumInformation: prevMomentumQuery?.rows[0] ?? null,
            nextMomentumInformation: nextMomentumQuery?.rows[0] ?? null
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
                    <div className={styles.titleline}>
                        <h2 className={styles.cardTitle}>Momentum #{momentum.height}</h2>
                        <Choices prev={props.prevMomentumInformation} next={props.nextMomentumInformation} momentum={momentum}/>
                    </div>
                    <hr className={styles.hr}/>
                    <div className={styles.cardbody}>
                        <div className={styles.cardleft}>Height</div>
                        <div className={styles.cardright}>
                            <Link href={{pathname: '/momentum/[momentum]', query: { momentum: momentum.height }}}>
                                <a>{momentum.height}</a>
                            </Link>
                        </div>
                        <div className={styles.cardleft}>Hash: </div>
                        <div className={styles.cardright}>
                            <Link href={{pathname: '/momentum/[momentum]', query: { momentum: momentum.hash }}}>
                                <a>{momentum.hash}</a>
                            </Link>
                        </div>
                        <div className={styles.cardleft}>Timestamp: </div>
                        <div className={styles.cardright}>{momentum.timestamp} ({time.timeConverter(momentum.timestamp)})</div>
                        <div className={styles.cardleft}># Txs</div>
                        <div className={styles.cardright}>
                            <MoreAccountBlocks momentum={momentum} />
                        </div>
                        <div className={styles.cardleft}>Producer: </div>
                        <div className={styles.cardright}>
                            <Link href={{pathname: '/address/[address]', query: { address: momentum.producer }}}>
                                <a>{momentum.producer}</a>
                            </Link>
                        </div>
                        <div className={styles.cardleft}>Data: </div>
                        <div className={styles.cardright}>{momentum.data}</div>
                        <div className={styles.cardleft}>Previous Hash: </div>
                        <div className={styles.cardright}>
                            <Link href={{pathname: '/momentum/[momentum]', query: { momentum: momentum.previoushash }}}>
                                <a>{momentum.previoushash}</a>
                            </Link>
                        </div>
                        <div className={styles.cardleft}>Public Key: </div>
                        <div className={styles.cardright}>{momentum.publickey}</div>
                        <div className={styles.cardleft}>Signature: </div>
                        <div className={styles.cardright}>{momentum.signature}</div>
                        <div className={styles.cardleft}>Chain Identifier: </div>
                        <div className={styles.cardright}>{momentum.chainidentifier}</div>
                        <div className={styles.cardleft}>Version: </div>
                        <div className={styles.cardright}>{momentum.version}</div>
                        <div className={styles.cardleft}>Changes Hash</div>
                        <div className={styles.cardright}>{momentum.changeshash}</div>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

function MoreAccountBlocks({ momentum }) {
    if (Number(momentum.countblocks) > 0) {
        return  (
            <>
                <Link href={{pathname: '/momentum/[momentum]/[page]', query: { momentum: momentum.height, page: 1 }}}>
                    <a>{momentum.countblocks}</a>
                </Link>
            </>
        )
    } else {
        return (
            <>
                {momentum.countblocks}
            </>
        )
    }
}

function Choices({ prev, next, momentum }) {
    if (prev && next) {
        return (
            <div className={styles.choices}>
                <Link href={{pathname: '/momentum/[momentum]', query: { momentum: momentum.height - 1 }}}>
                    <a className={styles.prevnext}>Previous</a>
                </Link>
                <Link href={{pathname: '/momentum/[momentum]', query: { momentum: momentum.height + 1 }}}>
                    <a className={styles.prevnext}>Next</a>
                </Link>
            </div>
        )
    } else if (prev) {
        return (
            <div className={styles.choices}>
                <Link href={{pathname: '/momentum/[momentum]', query: { momentum: momentum.height - 1 }}}>
                    <a className={styles.prevnext}>Previous</a>
                </Link>
            </div>
        )
    } else if (next) {
        return (
            <div className={styles.choices}>
                <Link href={{pathname: '/momentum/[momentum]', query: { momentum: momentum.height + 1 }}}>
                    <a className={styles.prevnext}>Next</a>
                </Link>
            </div>
        )
    } else {
        return <></>
    }
}

export default Momentum