import styles from './InformationSection.module.scss'

export default function InformationSection({ text, image, reverse=false, className={} }) {
    if (reverse === true) {
        return (
            <section className={`${styles.section} ${className}`}>
                <div className={`${styles.container} ${styles.reverseContainer}`}>
                    { image }
                    { text }
                </div>
            </section>
        )        
    } else {
        return (
            <section className={`${styles.section} ${className}`}>
                <div className={styles.container}>
                    { text }
                    { image }
                </div>
            </section>
        )

        
    }
}