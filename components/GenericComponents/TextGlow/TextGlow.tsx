import styles from './TextGlow.module.scss'

export default function TextGlow({ children }) {
    return (
        <span className={styles.glow}>{ children }</span>
    )
}