import styles from './TextGlow.module.scss'

export default function TextGlow({ children, style={} }) {
    return (
        <span className={styles.glow} style={style}>{ children }</span>
    )
}