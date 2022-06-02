import styles from './TableCell.module.scss'

export default function TableCell({ children=undefined, className={} }) {
    return (
        <td className={`${styles.tableCell} ${className}`}>
            { children }
        </td>
    )
}