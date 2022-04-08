import styles from './TextSemibold.module.scss'

export default function TextSemibold(props) {
    return (
        <p className={`${props.className} ${styles.textSemibold}`} style={props.style}>{ props.children }</p>
    )
}