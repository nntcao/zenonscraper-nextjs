import styles from './IconTextWrapper.module.scss'

export default function IconTextWrapper(props) {
    return (
        <div className={styles.wrapper}>
            { props.children }
        </div>
    )
}