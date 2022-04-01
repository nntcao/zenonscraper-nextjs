import styles from './SearchBarText.module.scss'
import SubtextMedium from '../../../GenericComponents/SubtextMedium/SubtextMedium'
import EmbeddedTextIcon from '../../../Icons/EmbeddedTextIcon/EmbeddedTextIcon'
import AddressIcon from '../../../Icons/AddressIcon/AddressIcon'

export default function SearchBarText(props) {
    return (
        <div className={styles.searchTextWrapper}>
            <SubtextMedium>Search Examples:</SubtextMedium>
            <div className={styles.iconWrapper}>
                <AddressIcon />
                <EmbeddedTextIcon />
            </div>
        </div>
    )
}