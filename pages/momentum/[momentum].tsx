import * as db from '../../services/db'
import * as time from '../../utils/time'
import ErrorPage from '../404'
import styles from './momentum.module.scss'
import Layout from '../../components/Layout/Layout'
import Link from 'next/link'
import Searchbar from '../../components/Searchbar/Searchbar'
import AccountBlockTable from '../../components/AccountBlockTable/AccountBlockTable'
import Image from 'next/image'

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


    var accountBlockQuery = await db.query(`
        SELECT b.hash, b.address, b.toaddress, b.amount, b.tokenstandard, b.usedplasma, b.momentumheight,
            b.timestamp, token.symbol, token.decimals
        FROM (
            SELECT a.hash, a.address, a.toaddress, a.amount, a.tokenstandard, a.usedplasma, momentum.height as momentumheight,
                momentum.timestamp
            FROM (
                    SELECT * FROM accountblock
                    WHERE momentumhash = $1
                ) AS a
            INNER JOIN momentum
            ON momentum.hash = a.momentumhash
            ORDER BY timestamp DESC, a.hash
            LIMIT $2
        ) AS b
        INNER JOIN token
        ON b.tokenstandard = token.tokenstandard
    `, [momentumQuery?.rows[0]?.hash, 10])

    return {
        props: {
            momentumInformation: momentumQuery?.rows[0] ?? null,
            prevMomentumInformation: prevMomentumQuery?.rows[0] ?? null,
            nextMomentumInformation: nextMomentumQuery?.rows[0] ?? null,
            accountBlockInformation: accountBlockQuery?.rows ?? null
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
                <div className={styles.searchBarWrapper}>
                    <Searchbar />
                </div>
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Momentum #{momentum.height}</h2>
                        <Choices prev={props.prevMomentumInformation} next={props.nextMomentumInformation} momentum={momentum} />
                    </div>
                    <div className={styles.cardbody}>
                        <div className={styles.cardleft}>Height</div>
                        <div className={styles.cardright}>
                            {momentum.height}
                        </div>
                        <div className={styles.cardleft}>Hash: </div>
                        <div className={styles.cardright}>
                            {momentum.hash}
                        </div>
                        <div className={styles.cardleft}>Timestamp: </div>
                        <div className={styles.cardright}>{time.timeConverter(momentum.timestamp)} ({`${time.msToFormattedTime(Date.now() - momentum.timestamp * 1000)} ago`})</div>
                        <div className={styles.cardleft}># Txs</div>
                        <div className={styles.cardright}>
                            <MoreAccountBlocks momentum={momentum} />
                        </div>
                        <div className={styles.cardleft}>Producer: </div>
                        <div className={styles.cardright}>
                            <Link href={{ pathname: '/address/[address]', query: { address: momentum.producer } }}>
                                <a className={styles.cardright}>{momentum.producer}</a>
                            </Link>
                        </div>
                        <div className={styles.cardleft}>Data: </div>
                        <div className={styles.cardright}>{momentum.data}</div>
                        <div className={styles.cardleft}>Previous Hash: </div>
                        <div className={styles.cardright}>
                            <Link href={{ pathname: '/momentum/[momentum]', query: { momentum: momentum.previoushash } }}>
                                <a className={styles.cardright}>{momentum.previoushash}</a>
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
                <div className={styles.card}>
                    <div className={styles.cardContent}>
                        <div className={styles.cardHeader}>
                            <div className={styles.cardHeaderLeft}>
                                <h2 className={styles.cardTitle}>Transactions for Momentum {momentum.height}</h2>
                                <h2 className={styles.cardSubtitle}>Displaying 1-10</h2>
                            </div>
                            <div className={styles.cardHeaderRight}>
                            </div>
                        </div>
                        <AccountBlockTable accountBlocks={props.accountBlockInformation} />
                        {props.accountBlockInformation[0] && <Link href={{ pathname: '/momentum/[momentum]/[page]', query: { momentum: momentum.height, page: 1 } }}>
                            <a className={styles.seeMore}>See more</a>
                        </Link>}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

function MoreAccountBlocks({ momentum }) {
    if (Number(momentum.countblocks) > 0) {
        return (
            <>
                <Link href={{ pathname: '/momentum/[momentum]/[page]', query: { momentum: momentum.height, page: 1 } }}>
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
                <Link href={{ pathname: '/momentum/[momentum]', query: { momentum: momentum.height - 1 } }}>
                    <a className={styles.imageFilterToBlack}>
                        <Image src="/keyboard_arrow_left_black_24dp.svg" width={24} height={24} />
                    </a>
                </Link>
                <Link href={{ pathname: '/momentum/[momentum]', query: { momentum: momentum.height + 1 } }}>
                    <a className={styles.imageFilterToBlack}>
                        <Image src="/keyboard_arrow_right_black_24dp.svg" width={24} height={24} />
                    </a>
                </Link>
            </div>
        )
    } else if (prev) {
        return (
            <div className={styles.choices}>
                <Link href={{ pathname: '/momentum/[momentum]', query: { momentum: momentum.height - 1 } }}>
                    <a className={styles.imageFilterToBlack}>
                        <Image src="/keyboard_arrow_left_black_24dp.svg" width={24} height={24} />
                    </a>
                </Link>
                <div className={styles.imageSpacer}></div>
            </div>
        )
    } else if (next) {
        return (
            <div className={styles.choices}>
                <div className={styles.imageSpacer}></div>
                <Link href={{ pathname: '/momentum/[momentum]', query: { momentum: momentum.height + 1 } }}>
                    <a className={styles.imageFilterToBlack}>
                        <Image src="/keyboard_arrow_right_black_24dp.svg" width={24} height={24} />
                    </a>
                </Link>
            </div>
        )
    } else {
        return <></>
    }
}

export default Momentum