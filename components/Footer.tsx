import Image from 'next/image'
import Link from 'next/link'
import styles from './Footer.module.scss'

export default function Footer() {
    const iconSize = "36"

    return (
        <nav className={styles.footer}>
            <section className={styles.footerWrapper}>
                <div className={styles.columns}>
                    <div className={`${styles.column} ${styles.imageColumn}`}>
                        <div className={styles.imageWrapper}>
                            <Image src="/banner.png" width="120" height="55" alt="Zenon Scraper Logo" />
                        </div>
                        <p className={styles.about}>Zenon Scraper is an explorer dedicated to the Network of Momentum. Search the blockchain with ease.</p>
                    </div>
                    <div className={styles.linkColumns}>
                        <div className={styles.column}>
                            <h2 className={styles.header}>Explore</h2>
                            <Link href='/'>
                                <a className={styles.link}>Home</a>
                            </Link>
                            {/* <Link href='/about'>
                                <a className={styles.link}>About</a>
                            </Link> */}
                            <Link href='/resources'>
                                <a className={styles.link}>Resources</a>
                            </Link>
                            <Link href='/donate'>
                                <a className={styles.link}>Donate</a>
                            </Link>
                        </div>
                        <div className={styles.column}>
                            <h2 className={styles.header}>Legal</h2>
                            <Link href='/legal/termsAndConditions'>
                                <a className={styles.link}>Terms</a>
                            </Link>
                            <Link href='/legal/privacyPolicy'>
                                <a className={styles.link}>Privacy</a>
                            </Link>
                        </div>
                        <div className={styles.column}>
                            <h2 className={styles.header}>Contact</h2>
                            <div className={styles.columnContact}>
                                <a className={styles.svgLink} href='https://github.com/vovi-z'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={iconSize} height={iconSize} viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                </a>
                                <a className={styles.svgLink} href='https://twitter.com/vovi__z'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={iconSize} height={iconSize} viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z"/></svg>
                                </a>
                                <a className={styles.svgLink} href='https://discordapp.com/users/173981751427858433'>
                                    <Image src="/iconmonstr-discord-4.svg" alt="Telegram Icon" width={iconSize} height={iconSize}/>
                                    
                                </a>
                                <a className={styles.svgLink} href='https://t.me/vovi_z'>
                                    <Image src="/iconmonstr-telegram-4.svg" alt="Telegram Icon" width={iconSize} height={iconSize}/>
                                </a>
                                <a className={styles.svgLink} href='mailto:vovinhivo@gmail.com'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={iconSize} height={iconSize} viewBox="0 0 24 24"><path d="M12 .02c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.99 6.98l-6.99 5.666-6.991-5.666h13.981zm.01 10h-14v-8.505l7 5.673 7-5.672v8.504z"/></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <span className={styles.copyright}>© 2022 vovi__z</span>
            </section>
        </nav>
    )
}