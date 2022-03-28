import HeaderLinks from '../HeaderLinks/HeaderLinks'
import TitleLogo from '../TitleLogo/TitleLogo'
import styles from './Header.module.scss'

export default function Header(props) {
    return (
        <div className={styles.header}>
            <TitleLogo />
            <HeaderLinks />
        </div>
    )
}