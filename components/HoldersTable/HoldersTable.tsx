import styles from './HoldersTable.module.scss'
import Link from 'next/link'

export default function HoldersTable({ holders, token, startRank }) {
    let rank = Number(startRank)

    if (!holders || holders === null || holders.length === 0) {
        return (
            <div> No holders for this token</div>
        )
    } else {
        return (
            <div className={styles.tablescroll}>
                <table className={styles.table}>
                    <thead className={styles.abheader}>
                        <tr>
                            <th scope="col" className={`${styles.abrow} ${styles.abrowheader}`}>Rank</th>
                            <th scope="col" className={`${styles.abrow} ${styles.abrowheader}`}>Address</th>
                            <th scope="col" className={`${styles.abrow} ${styles.abrowheader}`}>Amount</th>
                            <th scope="col" className={`${styles.abrow} ${styles.abrowheader}`}>Percentage</th>
                            <th scope="col" className={`${styles.abrow} ${styles.abrowheader}`}>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            holders.map(holder => {    
                            return (
                                <tr className={styles.abrows} key = {holder.address}>
                                    <td className={styles.abrow}>
                                        {rank++}
                                    </td>
                                    <td className={styles.abrow}>
                                        <Link href={{pathname: '/address/[address]', query: { address: holder.address }}}>
                                            <a className={styles.abrow}>{holder.address}</a>
                                        </Link>
                                    </td>
                                    <td className={`${styles.abrow}`}>
                                        {(Number(holder.balance) / (10 ** Number(token.decimals))).toLocaleString(undefined, {'minimumFractionDigits':2,'maximumFractionDigits':2})}
                                    </td>
                                    <td className={`${styles.abrow}`}>
                                        {(Number(holder.balance) / Number(token.totalsupply) * 100).toLocaleString(undefined, {'minimumFractionDigits':2,'maximumFractionDigits':2})}%
                                    </td>
                                    <td className={`${styles.abrow}`}>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}