import HeaderLinks from '../../../GenericComponents/HeaderLinks/HeaderLinks'
import ZSTitle from '../../../Icons/ZSTitle/ZSTitle'
import styles from './Header.module.scss'

export default function Header(props) {
    return (
        <div className={styles.header}>
            <ZSTitle />
            <HeaderLinks />
        </div>
    )
}