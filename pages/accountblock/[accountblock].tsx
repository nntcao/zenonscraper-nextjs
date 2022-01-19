import * as db from '../../services/db'
import * as time from '../../utils/time'
import ErrorPage from '../404'
import styles from './accountblock.module.scss'
import Layout from '../../components/Layout'
import Link from 'next/link'
import Searchbar from '../../components/Searchbar'

export async function getServerSideProps(context) {
    const searchString: string = context.params.accountblock
    const accountBlockQuery = await db.query(`
        SELECT a.height, a.hash, a.address, a.toaddress, a.amount, a.tokenstandard,
            a.data, a.fusedplasma, a.baseplasma, a.usedplasma, a.difficulty,
            a.previoushash, a.momentumhash, a.momentumacknowledgedhash, a.pairedhash,
            a.version, a.chainidentifier, a.blocktype, a.publickey, a.signature,
            a.nonce, a.changeshash, a.fromblockhash, token.decimals, token.symbol
        FROM (SELECT *
            FROM accountblock
            WHERE accountblock.hash = $1) AS a
        LEFT OUTER JOIN token
        ON token.tokenstandard = a.tokenstandard
    `, [searchString])
    const descendantBlockQuery = await db.query(`
            SELECT * FROM descendantblock
            WHERE hash = $1 
            OR descendanthash = $1
    `, [searchString])

    var prevAccountBlockQuery = await db.query(`
        SELECT hash FROM accountblock WHERE height = $1 AND address = $2
    `, [Number(accountBlockQuery?.rows[0]?.height) - 1, accountBlockQuery?.rows[0]?.address])
    var nextAccountBlockQuery = await db.query(`
        SELECT hash FROM accountblock WHERE height = $1 AND address = $2
    `, [Number(accountBlockQuery?.rows[0]?.height) + 1, accountBlockQuery?.rows[0]?.address])


    return {
        props: {
            accountBlockInformation: accountBlockQuery?.rows[0] ?? null,
            descendantBlockInformation: descendantBlockQuery?.rows ?? null,
            prevAccountBlockHash: prevAccountBlockQuery?.rows[0]?.hash ?? null,
            nextAccountBlockHash: nextAccountBlockQuery?.rows[0]?.hash ?? null,
        }
    }
}

function AccountBlock({ accountBlockInformation, descendantBlockInformation, prevAccountBlockHash, nextAccountBlockHash }) {
    if (!accountBlockInformation) {
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
                        <h2 className={styles.cardTitle}>Account Block {accountBlockInformation.hash}</h2>
                        <Choices prevHash={prevAccountBlockHash} nextHash={nextAccountBlockHash}/>
                    </div>
                    <hr />
                    <div className={styles.cardbody}>
                        <div className={styles.cardleft}>Height:</div>
                        <div className={styles.cardright}>
                            <Link href={{pathname: '/accountblock/[accountblock]', query: { accountblock: accountBlockInformation.hash }}}>
                                <a>{accountBlockInformation.height}</a>
                            </Link>
                        </div>
                        <div className={styles.cardleft}>Hash:</div>
                        <div className={styles.cardright}>
                            <Link href={{pathname: '/accountblock/[accountblock]', query: { accountblock: accountBlockInformation.hash }}}>
                                <a>{accountBlockInformation.hash}</a>
                            </Link>
                        </div>
                        <div className={styles.cardleft}>From Address:</div>
                        <div className={styles.cardright}>
                            <Link href={{pathname: '/address/[address]', query: { address: accountBlockInformation.address }}}>
                                <a>{accountBlockInformation.address}</a>
                            </Link>
                        </div>
                        <div className={styles.cardleft}>To Address:</div>
                        <div className={styles.cardright}>
                            <Link href={{pathname: '/address/[address]', query: { address: accountBlockInformation.toaddress }}}>
                                <a>{accountBlockInformation.toaddress}</a>
                            </Link>
                        </div>
                        <div className={styles.cardleft}>Amount:</div>
                        <div className={styles.cardright}>
                            {Math.round(accountBlockInformation.amount / (10 ** accountBlockInformation.decimals) * 100) / 100} 
                            <Symbol symbol={String(accountBlockInformation.symbol)} />
                        </div>
                        <div className={styles.cardleft}>Token Standard:</div>
                        <div className={styles.cardright}>
                            <Link href={{pathname: '/token/[token]', query: { token: accountBlockInformation.tokenstandard }}}>
                                <a>{accountBlockInformation.tokenstandard}</a>
                            </Link>
                        </div>
                        <div className={styles.cardleft}>Data:</div>
                        <div className={styles.cardright}>{accountBlockInformation.data}</div>
                        <div className={styles.cardleft}>Fused Plasma:</div>
                        <div className={styles.cardright}>{accountBlockInformation.fusedplasma}</div>
                        <div className={styles.cardleft}>Base Plasma:</div>
                        <div className={styles.cardright}>{accountBlockInformation.baseplasma}</div>
                        <div className={styles.cardleft}>Used Plasma:</div>
                        <div className={styles.cardright}>{accountBlockInformation.usedplasma}</div>
                        <div className={styles.cardleft}>Difficulty</div>
                        <div className={styles.cardright}>{accountBlockInformation.difficulty}</div>
                        <div className={styles.cardleft}>Previous Account Block Hash:</div>
                        <div className={styles.cardright}>
                            <Link href={{pathname: '/accountblock/[accountblock]', query: { accountblock: accountBlockInformation.previoushash }}}>
                                <a>{accountBlockInformation.previoushash}</a>
                            </Link>
                        </div>
                        <div className={styles.cardleft}>Momentum Hash:</div>
                        <div className={styles.cardright}>
                            <Link href={{pathname: '/momentum/[momentum]', query: { momentum: accountBlockInformation.momentumhash }}}>
                                <a>{accountBlockInformation.momentumhash}</a>
                            </Link>
                        </div>
                        <div className={styles.cardleft}>Momentum Acknowledged:</div>
                        <div className={styles.cardright}>
                            <Link href={{pathname: '/momentum/[momentum]', query: { momentum: accountBlockInformation.momentumacknowledgedhash }}}>
                                <a>{accountBlockInformation.momentumacknowledgedhash}</a>
                            </Link>
                        </div>
                        <div className={styles.cardleft}>Paired Account Block Hash:</div>
                        <div className={styles.cardright}>
                            <Link href={{pathname: '/accountblock/[accountblock]', query: { accountblock: accountBlockInformation.pairedhash }}}>
                                <a>{accountBlockInformation.pairedhash}</a>
                            </Link>
                        </div>
                        <div className={styles.cardleft}>Descendant Blocks:</div>
                        <div className={styles.cardright}>{descendantBlockInformation.map(descendantBlock => {
                            if (descendantBlock.hash === accountBlockInformation.hash) {
                                return (
                                    <div key={`${descendantBlock.hash} ${descendantBlock.descendanthash}`}>
                                        <Link href={{pathname: '/accountblock/[accountblock]', query: { accountblock: descendantBlock.descendanthash }}}>
                                            <a>{descendantBlock.descendanthash}</a>
                                        </Link>
                                    </div>
                                )
                            } else {
                                return null
                            }
                        })}
                        </div>
                        <div className={styles.cardleft}>Descendant Block Of:</div>
                        <div className={styles.cardright}>{descendantBlockInformation.map(descendantBlock => {
                            if (descendantBlock.descendanthash === accountBlockInformation.hash) {
                                return (
                                    <div key={`${descendantBlock.hash} ${descendantBlock.descendanthash}`}>
                                        <Link href={{pathname: '/accountblock/[accountblock]', query: { accountblock: descendantBlock.hash }}}>
                                            <a>{descendantBlock.hash}</a>
                                        </Link>
                                    </div>
                                )
                            } else {
                                return null
                            }
                        })}
                        </div>
                        <div className={styles.cardleft}>Version:</div>
                        <div className={styles.cardright}>{accountBlockInformation.version}</div>
                        <div className={styles.cardleft}>Chain Identifier:</div>
                        <div className={styles.cardright}>{accountBlockInformation.chainidentifier}</div>
                        <div className={styles.cardleft}>Block Type:</div>
                        <div className={styles.cardright}>{accountBlockInformation.blocktype}</div>
                        <div className={styles.cardleft}>Public Key:</div>
                        <div className={styles.cardright}>{accountBlockInformation.publickey}</div>
                        <div className={styles.cardleft}>Signature:</div>
                        <div className={styles.cardright}>{accountBlockInformation.signature}</div>
                        <div className={styles.cardleft}>Nonce:</div>
                        <div className={styles.cardright}>{accountBlockInformation.nonce}</div>
                        <div className={styles.cardleft}>Changes Hash:</div>
                        <div className={styles.cardright}>{accountBlockInformation.changeshash}</div>
                        <div className={styles.cardleft}>From Block Hash:</div>
                        <div className={styles.cardright}>{accountBlockInformation.fromblockhash}</div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

function Symbol({ symbol }) {
    if (symbol !== 'null') {
        return (
            <span> {symbol}</span>
        )
    } else {
        return <></>
    }
}

function Choices({ prevHash, nextHash }) {
    if (prevHash && nextHash) {
        return (
            <div className={styles.choices}>
                <Link href={{pathname: '/accountblock/[accountblock]', query: { accountblock: prevHash }}}>
                    <a className={styles.prevnext}>Previous</a>
                </Link>
                <Link href={{pathname: '/accountblock/[accountblock]', query: { accountblock: nextHash }}}>
                    <a className={styles.prevnext}>Next</a>
                </Link>
            </div>
        )
    } else if (prevHash) {
        return (
            <div className={styles.choices}>
                <Link href={{pathname: '/accountblock/[accountblock]', query: { accountblock: prevHash }}}>
                    <a className={styles.prevnext}>Previous</a>
                </Link>
            </div>
        )
    } else if (nextHash) {
        return (
            <div className={styles.choices}>
                <Link href={{pathname: '/accountblock/[accountblock]', query: { accountblock: nextHash }}}>
                    <a className={styles.prevnext}>Next</a>
                </Link>
            </div>
        )
    } else {
        return <></>
    }
}

export default AccountBlock