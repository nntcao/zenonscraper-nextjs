import TextMedium from '../TextMedium/TextMedium'
import styles from './BoundedTextbox.module.scss'

export default function BoundedTextbox({ children }) {
    return (  
        <div className={styles.box}>
            <TextMedium>{ children }</TextMedium>
        </div>
    )
}