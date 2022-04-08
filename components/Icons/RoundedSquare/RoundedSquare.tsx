import TextSemibold from '../../GenericComponents/TextSemibold/TextSemibold'
import styles from './RoundedSquare.module.scss'

export default function RoundedSquare({ children, style={} }) {
    return (
        <div className={styles.block} style={style}>
            <TextSemibold style={{alignText: 'center'}}> { children } </TextSemibold>
        </div>
    )
}