import ArrowForwardIcon from '../../Icons/ArrowForwardIcon/ArrowForwardIcon'
import CameraIcon from '../../Icons/CameraIcon/CameraIcon'
import SearchIcon from '../../Icons/SearchIcon/SearchIcon'
import SubtextMedium from '../SubtextMedium/SubtextMedium'
import styles from './SearchBar.module.scss'

export default function SearchBar({ arrow=false }) {
    if (arrow === true) {
        return (
            <div className={`${styles.box} ${styles.backgroundBox}`}>
                <form className={`${styles.start} ${styles.backgroundStart}`}>
                    <SearchIcon width='20' height='20'/>
                    <input type="text" 
                        placeholder='Search for transactions, addresses, blocks and embedded text data...'
                        className={`${styles.inputBox} ${styles.inputBoxResize}`}
                    />
                </form>
                <button className={styles.arrowWrapper}>
                    <ArrowForwardIcon width='20px' height='20px'/>
                </button>
            </div>
        )
    } else {
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
}