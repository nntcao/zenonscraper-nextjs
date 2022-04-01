import styles from './SubtextMedium.module.scss'

export default function SubtextMedium(props) {
    return (
        <p className={`${props.className} ${styles.textMedium}`}>{ props.children }</p>
    )
}