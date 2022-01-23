import styles from "./AccountBlockTable.module.scss"
import Link from "next/link"
import { timeConverter } from "../utils/time"

export default function AccountBlockTable({ accountBlocks }) {
    if (!accountBlocks || accountBlocks === null || accountBlocks.length === 0) {
        return (
            <div> No transactions/account blocks for this address</div>
        )
    } else {
        return (
            <div className={styles.tablescroll}>
                <table className={styles.table}>
                    <thead className={styles.abheader}>
                        <tr>
                            <th scope="col" className="abrow">Momentum Height</th>
                            <th scope="col" className="abrow">Timestamp</th>
                            <th scope="col" className="abrow">Hash</th>
                            <th scope="col" className="abrow">From</th>
                            <th scope="col" className="abrow">To</th>
                            <th scope="col" className="abrow">Amount</th>
                            <th scope="col" className="abrow">Token</th>
                            <th scope="col" className="abrow">Plasma</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accountBlocks.map(accountBlock => {    
                            return (
                                <tr className={styles.abrows} key = {accountBlock.hash}>
                                    <td className={styles.abrow}>
                                        <Link href={{pathname: '/momentum/[momentum]', query: { momentum: accountBlock.momentumheight }}}>
                                                <a>{accountBlock.momentumheight}</a>
                                        </Link>
                                    </td>
                                    <td className={styles.abrow}>
                                        {timeConverter(accountBlock.timestamp)}
                                    </td>
                                    <td className={`${styles.abrow} ${styles.truncate}`}>
                                        <Link href={{pathname: '/accountblock/[accountblock]', query: { accountblock: accountBlock.hash }}}>
                                                <a>{accountBlock.hash}</a>
                                        </Link>
                                    </td>
                                    <td className={`${styles.abrow} ${styles.truncate}`}>
                                        <Link href={{pathname: '/address/[address]', query: { address: accountBlock.address }}}>
                                                <a>{accountBlock.address}</a>
                                        </Link>
                                    </td>
                                    <td className={`${styles.abrow} ${styles.truncate}`}>
                                        <Link href={{pathname: '/address/[address]', query: { address: accountBlock.toaddress }}}>
                                                <a>{accountBlock.toaddress}</a>
                                        </Link>
                                    </td>
                                    <td className={styles.abrow}>
                                        {Number(accountBlock.amount) / (10 ** accountBlock.decimals)}
                                    </td>
                                    <td className={styles.abrow}>{accountBlock.tokenstandard}</td>
                                    <td className={styles.abrow}>{accountBlock.usedplasma}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
