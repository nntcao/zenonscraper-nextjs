import SubtextSemibold from '../../../GenericComponents/SubtextSemibold/SubtextSemibold'
import TextGlow from '../../../GenericComponents/TextGlow/TextGlow'
import TextSemibold from '../../../GenericComponents/TextSemibold/TextSemibold'
import RoundedSquare from '../../../Icons/RoundedSquare/RoundedSquare'
import styles from './FirstColumn.module.scss'

export default function FirstColumn({ height, timestamp }) {
    return (
        <div className={styles.container}>
            <RoundedSquare>Mn</RoundedSquare>
            <div className={styles.text}>
                <TextSemibold><TextGlow>{ height }</TextGlow></TextSemibold>
                <SubtextSemibold>{ timestamp }</SubtextSemibold>
            </div>
        </div>
    )
}