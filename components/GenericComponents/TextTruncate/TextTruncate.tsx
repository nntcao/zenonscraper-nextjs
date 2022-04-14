import styles from './TextTruncate.module.scss'

export default function TextTruncate({ children, style={}, className='' }) {
    return (
        <span style={style} className={`${styles.truncate} ${className}`}> { children } </span>
    )
}