import styles from './HoldersTable.module.scss'
import Link from 'next/link'

export default function HoldersTable({ holders, token }) {
    let rank = 1

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
                            <th scope="col" className="abrow">Rank</th>
                            <th scope="col" className="abrow">Address</th>
                            <th scope="col" className="abrow">Amount</th>
                            <th scope="col" className="abrow">Percentage</th>
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
                                            <a>{holder.address}</a>
                                        </Link>
                                    </td>
                                    <td className={`${styles.abrow} ${styles.truncate}`}>
                                        {(Number(holder.balance) / (10 ** token.decimals)).toLocaleString(undefined, {'minimumFractionDigits':2,'maximumFractionDigits':2})}
                                    </td>
                                    <td className={`${styles.abrow} ${styles.truncate}`}>
                                        {(Number(holder.balance) / Number(token.totalsupply) * 100).toLocaleString(undefined, {'minimumFractionDigits':2,'maximumFractionDigits':2})}%
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