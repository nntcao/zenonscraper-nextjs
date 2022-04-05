import styles from './TableCell.module.scss'

export default function TableCell({ children=undefined }) {
    return (
        <td className={styles.tableCell}>
            { children }
        </td>
    )
}