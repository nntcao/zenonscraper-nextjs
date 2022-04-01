import Title from "../../GenericComponents/Title/Title"
import TextMedium from "../../GenericComponents/TextMedium/TextMedium"
import styles from './HeroBody.module.scss'
import AddressIcon from '../../Icons/AddressIcon/AddressIcon'
import SearchBar from '../../SearchBar/SearchBar'
import SubtextMedium from '../../GenericComponents/SubtextMedium/SubtextMedium'
import EmbeddedTextIcon from '../../Icons/EmbeddedTextIcon/EmbeddedTextIcon'

export default function HeroBody({ title, description }) {
    return (
        <div className={styles.heroBody}>
            <div className={styles.heroText}>
                <Title>{title}</Title>
                <TextMedium>{description}</TextMedium>
            </div>
            <div className={styles.searchBarWrapper}>
                <SearchBar />
                <div className={styles.searchTextWrapper}>
                    <SubtextMedium>Search Examples:</SubtextMedium>
                    <div className={styles.iconWrapper}>
                        <AddressIcon />
                        <EmbeddedTextIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}