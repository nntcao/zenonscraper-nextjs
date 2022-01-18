import styles from './Footer.module.scss'

export default function Footer() {
    return (
        <div className={styles.footer}>
            <span className={styles.text}>Community explorer created by vovi__z</span>
            <span className={styles.text}>Twitter: <a className={styles.link} href='https://twitter.com/vovi__z'>@vovi__z</a></span>
            <span className={styles.text}>Discord: <a className={styles.link} href='https://discordapp.com/users/173981751427858433'>vovi__z#1208</a></span>
            <span className={styles.text}>Telegram: <a className={styles.link} href='https://t.me/vovi_z'>@vovi_z</a></span>
            <span className={styles.text}>Email: <a className={styles.link} href='mailto:vovinhivo@gmail.com'>vovinhivo@gmail.com</a></span>
        </div>
    )
}