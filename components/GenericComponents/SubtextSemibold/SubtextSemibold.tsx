import styles from './SubtextSemibold.module.scss'

export default function SubtextSemibold(props) {
    return (
        <p className={`${props.className} ${styles.subtextSemibold}`}>{ props.children }</p>
    )
}