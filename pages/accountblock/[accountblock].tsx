import * as db from '../../services/db'
import * as time from '../../utils/time'
import ErrorPage from '../404'
import styles from './accountblock.module.scss'
import Layout from '../../components/Layout'
import Link from 'next/link'

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
    return {
        props: {
            accountBlockInformation: accountBlockQuery?.rows[0] ?? null,
            descendantBlockInformation: descendantBlockQuery?.rows ?? null
        }
    }
}

function AccountBlock(props: any) {
    const accountBlock = props.accountBlockInformation
    const descendantBlocks = props.descendantBlockInformation
    if (!accountBlock) {
        return (
            <ErrorPage />
        )
    }
    return (
        <Layout>
            <div className={styles.main}>
                <span>Account Block {accountBlock.hash}</span>
                <hr />
                <div className={styles.card}>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Height:</div>
                        <div className={styles.rowright}>
                            <Link href={{pathname: '/accountblock/[accountblock]', query: { accountblock: accountBlock.hash }}}>
                                <a>{accountBlock.height}</a>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Hash:</div>
                        <div className={styles.rowright}>
                            <Link href={{pathname: '/accountblock/[accountblock]', query: { accountblock: accountBlock.hash }}}>
                                <a>{accountBlock.hash}</a>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>From Address:</div>
                        <div className={styles.rowright}>
                            <Link href={{pathname: '/address/[address]', query: { address: accountBlock.address }}}>
                                <a>{accountBlock.address}</a>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>To Address:</div>
                        <div className={styles.rowright}>
                            <Link href={{pathname: '/address/[address]', query: { address: accountBlock.toaddress }}}>
                                <a>{accountBlock.toaddress}</a>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Amount:</div>
                        <div className={styles.rowright}>
                            {Math.round(accountBlock.amount / (10 ** accountBlock.decimals) * 100) / 100} 
                            <Symbol symbol={String(accountBlock.symbol)} />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Token Standard:</div>
                        <div className={styles.rowright}>
                            <Link href={{pathname: '/token/[token]', query: { token: accountBlock.tokenstandard }}}>
                                <a>{accountBlock.tokenstandard}</a>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Data:</div>
                        <div className={styles.rowright}>{accountBlock.data}</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Fused Plasma:</div>
                        <div className={styles.rowright}>{accountBlock.fusedplasma}</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Base Plasma:</div>
                        <div className={styles.rowright}>{accountBlock.baseplasma}</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Used Plasma:</div>
                        <div className={styles.rowright}>{accountBlock.usedplasma}</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Difficulty</div>
                        <div className={styles.rowright}>{accountBlock.difficulty}</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Previous Account Block Hash:</div>
                        <div className={styles.rowright}>
                            <Link href={{pathname: '/accountblock/[accountblock]', query: { accountblock: accountBlock.previoushash }}}>
                                <a>{accountBlock.previoushash}</a>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Momentum Hash:</div>
                        <div className={styles.rowright}>
                            <Link href={{pathname: '/momentum/[momentum]', query: { momentum: accountBlock.momentumhash }}}>
                                <a>{accountBlock.momentumhash}</a>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Momentum Acknowledged:</div>
                        <div className={styles.rowright}>
                            <Link href={{pathname: '/momentum/[momentum]', query: { momentum: accountBlock.momentumacknowledgedhash }}}>
                                <a>{accountBlock.momentumacknowledgedhash}</a>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Paired Account Block Hash:</div>
                        <div className={styles.rowright}>
                            <Link href={{pathname: '/accountblock/[accountblock]', query: { accountblock: accountBlock.pairedhash }}}>
                                <a>{accountBlock.pairedhash}</a>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Descendant Blocks:</div>
                        <div className={styles.rowright}>{descendantBlocks.map(descendantBlock => {
                            if (descendantBlock.hash === accountBlock.hash) {
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
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Descendant Block Of:</div>
                        <div className={styles.rowright}>{descendantBlocks.map(descendantBlock => {
                            if (descendantBlock.descendanthash === accountBlock.hash) {
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
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Version:</div>
                        <div className={styles.rowright}>{accountBlock.version}</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Chain Identifier:</div>
                        <div className={styles.rowright}>{accountBlock.chainidentifier}</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Block Type:</div>
                        <div className={styles.rowright}>{accountBlock.blocktype}</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Public Key:</div>
                        <div className={styles.rowright}>{accountBlock.publickey}</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Signature:</div>
                        <div className={styles.rowright}>{accountBlock.signature}</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Nonce:</div>
                        <div className={styles.rowright}>{accountBlock.nonce}</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>Changes Hash:</div>
                        <div className={styles.rowright}>{accountBlock.changeshash}</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowleft}>From Block Hash:</div>
                        <div className={styles.rowright}>{accountBlock.fromblockhash}</div>
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

export default AccountBlock