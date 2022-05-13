import styles from './Subtitle.module.scss'

export default function Subtitle({ children, className={} }) {
    return (
        <h2 className={`${className} ${styles.subtitle}`}> { children } </h2>
    )
}