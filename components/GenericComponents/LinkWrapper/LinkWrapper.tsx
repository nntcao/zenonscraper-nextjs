import Link from 'next/link'
import styles from './LinkWrapper.module.scss'

export default function LinkWrapper({ href, children }) {
    return (
        <Link href={href}>
            <a>
                {children}
            </a>
        </Link>
    )
}