import Logo from '../Logo/Logo'
import styles from './Header.module.scss'

export default function Header(props) {
    return (
        <div className={styles.header}>
            <Logo hoverEnabled={true}/>
        </div>
    )
}