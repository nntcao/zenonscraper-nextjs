import styles from './TableHeader.module.scss'

export default function TableHeader({ children=undefined }) {
    return (
        <thead className={styles.tableHeader}>
            { children }
        </thead>
    )
}