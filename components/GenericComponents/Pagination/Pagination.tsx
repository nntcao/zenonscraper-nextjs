import ArrowBackwardSimpleIcon from '../../Icons/ArrowBackwardSimpleIcon/ArrowBackwardSimpleIcon'
import ArrowForwardSimpleIcon from '../../Icons/ArrowForwardSimpleIcon/ArrowForwardSimpleIcon'
import TextSemibold from '../TextSemibold/TextSemibold'
import styles from './Pagination.module.scss'

export default function Pagination({currentPage, lastPage, onBackButtonClick, onForwardButtonClick, onFirstClick, onLastClick}) {
    return (
        <div className={styles.content}>
            <button className={`${styles.word} ${styles.wordButton}`} onClick={onFirstClick}><TextSemibold className={styles.wordButton}>First</TextSemibold></button>
            <button className={styles.arrow} onClick={onBackButtonClick}>
                <ArrowBackwardSimpleIcon className={styles.arrowSvg}/>
            </button>
            <div className={styles.word}><TextSemibold>Page 1 of 1000</TextSemibold></div>
            <button className={styles.arrow} onClick={onForwardButtonClick}>
                <ArrowForwardSimpleIcon className={styles.arrowSvg}/>
            </button>
            <button className={`${styles.word} ${styles.wordButton}`} onClick={onLastClick}><TextSemibold className={styles.wordButton}>Last</TextSemibold></button>
        </div>
    )
}