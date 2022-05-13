import Link from 'next/link'
import styles from './LinkWrapper.module.scss'

export default function LinkWrapper({ href, children, className={} }) {
    return (
        <Link href={href}>
            <a className={`${className}`}>
                {children}
            </a>
        </Link>
    )
}