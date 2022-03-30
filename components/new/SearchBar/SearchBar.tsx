import CameraIcon from '../Icons/CameraIcon/CameraIcon'
import SearchIcon from '../Icons/SearchIcon/SearchIcon'
import SubtextMedium from '../GenericComponents/SubtextMedium/SubtextMedium'
import styles from './SearchBar.module.scss'

export default function SearchBar() {
    return (
        <div className={styles.box}>
            <div className={styles.start}>
                <SearchIcon />
                <SubtextMedium>Search for transactions, addresses, blocks and embedded text data...</SubtextMedium>
            </div>
            <CameraIcon />
        </div>
    )
}