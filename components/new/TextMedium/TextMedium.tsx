import styles from './TextMedium.module.scss'
import colors from '../../../styles/colors.module.scss'

const defaultProps = {
    children: '',
    color: colors.white,
}

export default function TextMedium(props) {
    props = {...defaultProps, ...props}
    return (
        <p className={styles.textMedium} style={{color: props.color}}>
            { props.children }
        </p>
    )
}