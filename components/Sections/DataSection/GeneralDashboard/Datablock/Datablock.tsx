import styles from './Datablock.module.scss'

export default function Datablock({icon, title, text, reverse=false}) {
    if (reverse === true) {
        return (
            <div className={styles.dataBlock}>
                <div className={`${styles.textBody} ${styles.textBodyReverse}`}>
                    <div className={styles.title}>
                        {title}
                    </div>
                    <div className={styles.description}>
                        {text}
                    </div>
                </div>
                {icon}
            </div>
        )
    } else {
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
}