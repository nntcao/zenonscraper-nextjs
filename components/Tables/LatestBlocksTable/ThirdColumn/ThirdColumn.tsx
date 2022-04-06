import TextMedium from '../../../GenericComponents/TextMedium/TextMedium'
import styles from './ThirdColumn.module.scss'

export default function ThirdColumn({ amount }) {
    return (  
        <div className={styles.box}>
            <TextMedium>{ amount } ZNN</TextMedium>
        </div>
    )
}