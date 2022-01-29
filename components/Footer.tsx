import styles from './Footer.module.scss'

export default function Footer() {
    return (
        <nav className={styles.footer}>
            <div className={styles.footerleft}>
                <span className={styles.text}><a className={styles.link} href='https://github.com/vovi-z'>Github</a></span>
                <span className={styles.text}><a className={styles.link} href='https://twitter.com/vovi__z'>Twitter</a></span>
                <span className={styles.text}><a className={styles.link} href='https://discordapp.com/users/173981751427858433'>Discord</a></span>
                <span className={styles.text}><a className={styles.link} href='https://t.me/vovi_z'>Telegram</a></span>
                <span className={styles.text}><a className={styles.link} href='mailto:vovinhivo@gmail.com'>Email</a></span>
            </div>
            <div className={styles.footerright}>
                <div className={styles.text}>© 2021 vovi__z</div>
            </div>
        </nav>
    )
}