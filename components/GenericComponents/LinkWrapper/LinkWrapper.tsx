import Link from 'next/link'
import styles from './LinkWrapper.module.scss'

export default function LinkWrapper(props) {
    return (
        <Link href={props.href}>
            <a>
                {props.children}
            </a>
        </Link>
    )
}