import styles from './TableRow.module.scss'

export default function TableRow({ className='', children=undefined }) {
    return (
        <tr className={`${styles.tableRow} ${className}`}>
            { children }
        </tr>
    )
}