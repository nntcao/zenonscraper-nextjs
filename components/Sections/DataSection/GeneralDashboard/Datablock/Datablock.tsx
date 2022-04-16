import styles from './Datablock.module.scss'

export default function Datablock({icon, title, text}) {
    return (
        <div className={styles.dataBlock}>
            {icon}
            <div className={styles.textBody}>
                <div className={styles.title}>
                    {title}
                </div>
                <div className={styles.description}>
                    {text}
                </div>
            </div>
        </div>
    )
}