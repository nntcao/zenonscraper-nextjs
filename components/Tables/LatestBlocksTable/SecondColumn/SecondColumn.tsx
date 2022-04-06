import SubtextSemibold from '../../../GenericComponents/SubtextSemibold/SubtextSemibold'
import TextGlow from '../../../GenericComponents/TextGlow/TextGlow'
import TextSemibold from '../../../GenericComponents/TextSemibold/TextSemibold'
import styles from './SecondColumn.module.scss'

export default function SecondColumn({producer, txnCount, time}) {
    return (
        <div className={styles.box}>
            <TextSemibold>Producer <TextGlow>{producer}</TextGlow></TextSemibold>
            <SubtextSemibold> <TextGlow>{txnCount} txns</TextGlow> in {time}</SubtextSemibold>
        </div>
    )
}