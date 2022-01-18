import styles from './Footer.module.scss'

export default function Footer() {
    return (
        <nav className={styles.footer}>
            <div className={styles.footerleft}>
                <span className={styles.text}>Created by vovi__z</span>
                <a href='/donate' className={`${styles.text} ${styles.link}`}>
                    Donate
                </a>
                <span className={styles.text}>Twitter: <a className={styles.link} href='https://twitter.com/vovi__z'>@vovi__z</a></span>
                <span className={styles.text}>Discord: <a className={styles.link} href='https://discordapp.com/users/173981751427858433'>vovi__z#1208</a></span>
                <span className={styles.text}>Telegram: <a className={styles.link} href='https://t.me/vovi_z'>@vovi_z</a></span>
                <span className={styles.text}>Email: <a className={styles.link} href='mailto:vovinhivo@gmail.com'>vovinhivo@gmail.com</a></span>
            </div>
        </nav>
    )
}