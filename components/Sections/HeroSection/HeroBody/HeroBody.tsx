import Title from "../../../GenericComponents/Title/Title"
import TextMedium from "../../../GenericComponents/TextMedium/TextMedium"
import styles from './HeroBody.module.scss'
import SearchBar from '../../../GenericComponents/SearchBar/SearchBar'
import SearchBarText from "../SearchBarText/SearchBarText"


export default function HeroBody({ title, description }) {
    return (
        <div className={styles.heroBody}>
            <div className={styles.heroText}>
                <Title>{title}</Title>
                <TextMedium>{description}</TextMedium>
            </div>
            <div className={styles.searchBarWrapper}>
                <SearchBar />
                <SearchBarText />
            </div>
        </div>
    )
}