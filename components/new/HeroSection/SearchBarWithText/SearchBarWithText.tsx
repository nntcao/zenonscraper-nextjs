import IconTextWrapper from '../../GenericComponents/IconTextWrapper/IconTextWrapper'
import AddressIcon from '../../Icons/AddressIcon/AddressIcon'
import SearchBar from '../../SearchBar/SearchBar'
import SubtextMedium from '../../GenericComponents/SubtextMedium/SubtextMedium'
import TextMedium from '../../GenericComponents/TextMedium/TextMedium'
import styles from './SearchBarWithText.module.scss'
import EmbeddedTextIcon from '../../Icons/EmbeddedTextIcon/EmbeddedTextIcon'

export default function SearchBarWithText(props) {
    return (
        <div className={styles.searchBarWrapper}>
            <SearchBar />
            <div className={styles.searchTextWrapper}>
                <SubtextMedium>Search Examples:</SubtextMedium>
                <div className={styles.iconWrapper}>
                    <IconTextWrapper>
                        <AddressIcon />
                        <TextMedium>Address</TextMedium>
                    </IconTextWrapper>
                    <IconTextWrapper>
                        <EmbeddedTextIcon />
                        <TextMedium>Embed Text Data</TextMedium>
                    </IconTextWrapper>
                </div>
            </div>
        </div>
    )
}