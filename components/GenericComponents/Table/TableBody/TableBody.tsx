import styles from './TableBody.module.scss'

export default function TableBody({ children=undefined }) {
    return (
        <tbody className={styles.tableBody}>
            { children }
        </tbody>
    )
}