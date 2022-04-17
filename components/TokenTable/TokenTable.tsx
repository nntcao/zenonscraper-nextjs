import styles from './TokenTable.module.scss'
import Link from 'next/link'
import BigNumber from "bignumber.js";

export default function TokenTable({ tokens }) {
    if (!tokens || tokens === null || tokens.length === 0) {
        return (
            <div> No tokens for this token</div>
        )
    } else {
        return (
            <div className={styles.tablescroll}>
                <table className={styles.table}>
                    <thead className={styles.abheader}>
                        <tr>
                            <th scope="col" className={`${styles.abrow} ${styles.abrowheader}`}>Token</th>
                            <th scope="col" className={`${styles.abrow} ${styles.abrowheader}`}>Description</th>
                            <th scope="col" className={`${styles.abrow} ${styles.abrowheader}`}>Holders</th>
                            <th scope="col" className={`${styles.abrow} ${styles.abrowheader}`}>Total Supply</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tokens.map(token => {
                                return (
                                    <tr className={styles.abrows} key = {token.tokenstandard}>
                                        <td className={styles.abrow}>
                                            <Link href={{pathname: '/token/[token]', query: { token: token.symbol }}}>
                                                <a className={styles.abrow}>{token.symbol}</a>
                                            </Link>
                                        </td>
                                        <td className={`${styles.abrow} ${styles.description}`}>
                                            {token.description}
                                        </td>
                                        <td className={styles.abrow}>
                                            {
                                            (token.countholders).toLocaleString()}
                                        </td>
                                        <td className={`${styles.abrow}`}>
                                            {
                                                // @ts-ignore
                                                (new BigNumber(token.totalsupply) / (new BigNumber(10) ** new BigNumber(token.decimals))).toString()
                                            }
                                        </td>
                                    </tr>
                                )
                            }
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}