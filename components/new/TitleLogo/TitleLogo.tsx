import styles from './TitleLogo.module.scss'
import ZenonScraperLogo from "../ZenonScraperLogo/ZenonScraperLogo";

export default function TitleLogo(props) {
    return (
        <div className={styles.logoTitle}>
            <ZenonScraperLogo />
            <h1 className={styles.title}>ZENON SCRAPER</h1>
        </div>
    )
}