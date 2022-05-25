import SearchBar from '../../GenericComponents/SearchBar/SearchBar'
import ZSTitle from '../../Icons/ZSTitle/ZSTitle'
import HeaderLinks from '../../GenericComponents/HeaderLinks/HeaderLinks'
import styles from './Header.module.scss'

export default function Header(props) {
    return (
        <header className={styles.section}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <ZSTitle width='163px' height='38px' />
                </div>
                <div className={styles.searchBar}>
                    <SearchBar arrow={true}/>
                </div>
                <div className={styles.options}>
                    <HeaderLinks />
                </div>
            </div>
        </header>
    )
}