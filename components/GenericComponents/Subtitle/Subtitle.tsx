import styles from './Subtitle.module.scss'

export default function Subtitle({ children }) {
    return (
        <h2 className={styles.subtitle}> { children } </h2>
    )
}