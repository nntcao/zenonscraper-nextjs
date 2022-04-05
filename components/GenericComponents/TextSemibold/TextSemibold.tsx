import styles from './TextSemibold.module.scss'

export default function TextSemibold(props) {
    return (
        <p className={`${props.className} ${styles.textSemibold}`}>{ props.children }</p>
    )
}