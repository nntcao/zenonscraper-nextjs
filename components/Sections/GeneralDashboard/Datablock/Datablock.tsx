import div from '../../../GenericComponents/SubtextMedium/SubtextMedium'
import Icon from '../../../GenericComponents/Icon/Icon'
import styles from './Datablock.module.scss'
import TextMedium from '../../../GenericComponents/TextMedium/TextMedium'

export default function Datablock({src, title, text}) {
    return (
        <div className={styles.dataBlock}>
            <Icon src={src} />
            <div className={styles.textBody}>
                <div className={styles.title}>
                    {title}
                </div>
                <div className={styles.description}>
                    {text}
                </div>
            </div>
        </div>
    )
}