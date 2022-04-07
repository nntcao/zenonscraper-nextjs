import TextMedium from '../TextMedium/TextMedium'
import styles from './BoundedTextbox.module.scss'

export default function BoundedTextbox({ amount }) {
    return (  
        <div className={styles.box}>
            <TextMedium>{ amount } ZNN</TextMedium>
        </div>
    )
}