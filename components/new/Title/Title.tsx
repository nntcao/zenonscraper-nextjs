import styles from './Title.module.scss'
import colors from '../../../styles/colors.module.scss'

const defaultProps = {
    children: 'Hello World',
    color: colors.white,
}

export default function Title(props) {
    props = {...defaultProps, ...props}
    return (
        <h1 className={styles.title} style={{color: props.color}}>
            { props.children }
        </h1>
    )
}