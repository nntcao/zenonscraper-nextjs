import styles from "./MomentumTable.module.scss"
import Link from "next/link"
import * as time from "../utils/time"
import { useState } from "react"

export default function MomentumTable({ momentums }) {
    const [isRelativeTimestamp, setRelativeTimestamp] = useState(true)

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
                            <th scope="col" className={`${styles.abrow} ${styles.abrowheader}`}>Momentum Height</th>
                            <th scope="col" className={`${styles.abrow} ${styles.abrowheader}`}>
                                <button className={styles.button} onClick={() => setRelativeTimestamp(!isRelativeTimestamp)}>
                                    {isRelativeTimestamp && `Age`}{!isRelativeTimestamp && 'Timestamp'}
                                </button>
                            </th>
                            <th scope="col" className={`${styles.abrow} ${styles.abrowheader}`}># Txs</th>
                            <th scope="col" className={`${styles.abrow} ${styles.abrowheader}`}>Hash</th>
                            <th scope="col" className={`${styles.abrow} ${styles.abrowheader}`}>Producer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {momentums.map(momentum => {
                            return (
                                <tr className={styles.abrows} key={momentum.hash}>
                                    <td className={styles.abrow}>
                                        <Link href={{ pathname: '/momentum/[momentum]', query: { momentum: momentum.height } }}>
                                            <a className={styles.tableLink}>{momentum.height}</a>
                                        </Link>
                                    </td>
                                    <td className={styles.abrow}>
                                        <TimestampComponent timestamp={momentum.timestamp} isRelativeTimestamp={isRelativeTimestamp}/>
                                    </td>
                                    <td className={styles.abrow}>
                                        <MomentumTransactionsComponent momentum={momentum} />
                                    </td>
                                    <td className={`${styles.abrow}`}>
                                        <Link href={{ pathname: '/momentum/[momentum]', query: { momentum: momentum.hash } }}>
                                            <a className={styles.tableLink}>{momentum.hash}</a>
                                        </Link>
                                    </td>
                                    <td className={`${styles.abrow}`}>
                                        <Link href={{ pathname: '/address/[address]', query: { address: momentum.producer } }}>
                                            <a className={styles.tableLink}>{momentum.producer}</a>
                                        </Link>
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


function MomentumTransactionsComponent({ momentum }) {
    if (momentum.countblocks > 0) {
        return (
            <Link href={{ pathname: '/momentum/[momentum]/[page]', query: { momentum: momentum.height, page: 1 } }}>
                <a className={styles.tableLink}>{momentum.countblocks} Txs</a>
            </Link>
        )
    }
    return (
        <>
            {momentum.countblocks} Txs
        </>
    )
}

function TimestampComponent({ timestamp, isRelativeTimestamp }) {
if (isRelativeTimestamp) {
    return (
        <>
            {`${time.msToFormattedTime(Date.now() - (timestamp * 1000))} ago`}
        </>
    )
} else {
    return (
        <>
            {time.timeConverter(timestamp)}
        </>
    )
}
}