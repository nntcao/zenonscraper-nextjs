import Title from "../Title/Title"
import TextMedium from "../TextMedium/TextMedium"
import SearchBar from '../SearchBar/SearchBar'
import styles from './HeroBody.module.scss'

export default function HeroText({ title, description }) {
    return (
            <div className={styles.heroBody}>
                <div className={styles.heroText}>
                    <Title>
                        {title}
                    </Title>
                    <TextMedium>
                        {description}
                    </TextMedium>
                    <SearchBar />
                </div>
            </div>
    )
}