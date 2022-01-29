import styles from "./MomentumTable.module.scss"
import Link from "next/link"
import { timeConverter } from "../utils/time"

export default function MomentumTable({ momentums }) {
    if (!momentums || momentums === null || momentums.length === 0) {
        return (
            <div> No momentums found!</div>
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
                            <th scope="col" className="abrow">Producer</th>
                            <th scope="col" className="abrow"># Account Blocks/Transactions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {momentums.map(momentum => {    
                            return (
                                <tr className={styles.abrows} key = {momentum.hash}>
                                    <td className={styles.abrow}>
                                        <Link href={{pathname: '/momentum/[momentum]', query: { momentum: momentum.height }}}>
                                                <a>{momentum.height}</a>
                                        </Link>
                                    </td>
                                    <td className={styles.abrow}>
                                        {timeConverter(momentum.timestamp)}
                                    </td>
                                    <td className={`${styles.abrow} ${styles.truncate}`}>
                                        <Link href={{pathname: '/momentum/[momentum]', query: { momentum: momentum.hash }}}>
                                                <a>{momentum.hash}</a>
                                        </Link>
                                    </td>
                                    <td className={`${styles.abrow}`}>
                                        <Link href={{pathname: '/address/[address]', query: { address: momentum.producer }}}>
                                                <a>{momentum.producer}</a>
                                        </Link>
                                    </td>
                                    <td className={styles.abrow}>
                                        <MomentumTransactionsComponent momentum={momentum} />
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


function MomentumTransactionsComponent({momentum}) {
    if (momentum.countblocks > 0) {
      return (
        <Link href={{pathname: '/momentum/[momentum]/[page]', query: { momentum: momentum.height, page: 1 }}}>
          <a>{momentum.countblocks} Txs</a>
        </Link>
      )
    }
    return (
      <>
        {momentum.countblocks} Txs
      </>
    )
  }
  