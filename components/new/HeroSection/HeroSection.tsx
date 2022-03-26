import Header from '../Header/Header'
import SearchBar from '../SearchBar/SearchBar'
import TextMedium from '../TextMedium/TextMedium'
import Title from '../Title/Title'
import styles from './HeroSection.module.scss'

export default function HeroSection(props) {
    return (
        <div className={styles.heroSection}>
            <Header />
            {/* <HeroText> */}
                <Title>
                    Zenon Blockchain Explorer, web and API services.
                </Title>
                <TextMedium>
                    Explore data stored on 19 blockchains
                </TextMedium>
            {/* </HeroText> */}
            <SearchBar />
        </div>
    )
}

