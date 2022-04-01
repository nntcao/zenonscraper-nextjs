import CameraIcon from '../../Icons/CameraIcon/CameraIcon'
import SearchIcon from '../../Icons/SearchIcon/SearchIcon'
import SubtextMedium from '../SubtextMedium/SubtextMedium'
import styles from './SearchBar.module.scss'

export default function SearchBar() {
    return (
        <div className={styles.box}>
            <form className={styles.start}>
                <SearchIcon />
                <input type="text" 
                    placeholder='Search for transactions, addresses, blocks and embedded text data...'
                    className={styles.inputBox}
                />
            </form>
            <CameraIcon />
        </div>
    )
}