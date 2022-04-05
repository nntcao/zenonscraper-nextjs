import TextSemibold from '../../GenericComponents/TextSemibold/TextSemibold'
import styles from './RoundedSquare.module.scss'

export default function RoundedSquare({ children }) {
    return (
        <div className={styles.block}>
            <TextSemibold> { children } </TextSemibold>
        </div>
    )
}