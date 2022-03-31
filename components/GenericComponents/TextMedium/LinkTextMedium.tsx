import Link from "next/link"
import styles from './TextMedium.module.scss'

export default function LinkTextMedium({ href, children }) {
    return (
        <Link href={href}>
            <a className={styles.textMedium}>{ children }</a>
        </Link>
    )
}