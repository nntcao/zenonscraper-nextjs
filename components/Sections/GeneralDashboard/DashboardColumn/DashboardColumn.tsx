import styles from './DashboardColumn.module.scss'

export default function DashboardColumn(props) {
    return (
        <div className={styles.column}>
            {props.children}
        </div>
    )
}