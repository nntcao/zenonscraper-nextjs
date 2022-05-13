import styles from './TextGlow.module.scss'

export default function TextGlow({ children, style={}, className={} }) {
    return (
        <span className={`${styles.glow} ${className}`} style={style}>{ children }</span>
    )
}