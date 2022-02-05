import styles from "./AccountBlockTable.module.scss"
import Link from "next/link"
import * as time from "../../utils/time"
import { useState } from "react"

export default function AccountBlockTable({ accountBlocks }) {

    const [isRelativeTimestamp, setRelativeTimestamp] = useState(true)

    if (!accountBlocks || accountBlocks === null || accountBlocks.length === 0) {
        return (
            <div> No transactions found!</div>
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
                            <th scope="col" className={`${styles.abrow} ${styles.abrowheader}`}>Hash</th>
                            <th scope="col" className={`${styles.abrow} ${styles.abrowheader}`}>From</th>
                            <th scope="col" className={`${styles.abrow} ${styles.abrowheader}`}>To</th>
                            <th scope="col" className={`${styles.abrow} ${styles.abrowheader}`}>Amount</th>
                            <th scope="col" className={`${styles.abrow} ${styles.abrowheader}`}>Token</th>
                            <th scope="col" className={`${styles.abrow} ${styles.abrowheader}`}>Plasma</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accountBlocks.map(accountBlock => {    
                            return (
                                <tr className={styles.abrows} key = {accountBlock.hash}>
                                    <td className={styles.abrow}>
                                        <Link href={{pathname: '/momentum/[momentum]', query: { momentum: accountBlock.momentumheight }}}>
                                                <a className={styles.tableLink}>{accountBlock.momentumheight}</a>
                                        </Link>
                                    </td>
                                    <td className={styles.abrow}>
                                        <TimestampComponent timestamp={accountBlock.timestamp} isRelativeTimestamp={isRelativeTimestamp}/>
                                    </td>
                                    <td className={`${styles.abrow} ${styles.truncate}`}>
                                        <Link href={{pathname: '/accountblock/[accountblock]', query: { accountblock: accountBlock.hash }}}>
                                                <a className={styles.tableLink}>{accountBlock.hash}</a>
                                        </Link>
                                    </td>
                                    <td className={`${styles.abrow} ${styles.truncate}`}>
                                        <Link href={{pathname: '/address/[address]', query: { address: accountBlock.address }}}>
                                                <a className={styles.tableLink}>{accountBlock.address}</a>
                                        </Link>
                                    </td>
                                    <td className={`${styles.abrow} ${styles.truncate}`}>
                                        <Link href={{pathname: '/address/[address]', query: { address: accountBlock.toaddress }}}>
                                                <a className={styles.tableLink}>{accountBlock.toaddress}</a>
                                        </Link>
                                    </td>
                                    <td className={styles.abrow}>
                                        {Number(accountBlock.amount) / (10 ** accountBlock.decimals)}
                                    </td>
                                    <td className={styles.abrow}>
                                        <Link href={{pathname: '/token/[token]', query: { token: accountBlock.tokenstandard }}}>
                                            <a className={styles.tableLink}>{accountBlock.symbol ?? accountBlock.tokenstandard}</a>
                                        </Link>
                                    </td>
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


function TimestampComponent({ timestamp, isRelativeTimestamp }) {
    if (isRelativeTimestamp) {
        return (
            <>
                {`${time.msToFormattedTime(Date.now() - timestamp * 1000)} ago`}
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