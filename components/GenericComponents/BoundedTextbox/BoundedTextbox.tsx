import TextMedium from '../TextMedium/TextMedium'
import styles from './BoundedTextbox.module.scss'

export default function BoundedTextbox({ children, style={} }) {
    return (  
        <div className={styles.box} style={style}>
            <TextMedium style={{ textAlign: 'center' }}>{ children }</TextMedium>
        </div>
    )
}