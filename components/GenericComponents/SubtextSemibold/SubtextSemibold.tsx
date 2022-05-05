import styles from './SubtextSemibold.module.scss'
import SubtextMedium from '../SubtextMedium/SubtextMedium'

export default function SubtextSemibold(props) {
    return (
        <SubtextMedium className={`${props.className} ${styles.subtextSemibold}`}>{ props.children }</SubtextMedium>
    )
}