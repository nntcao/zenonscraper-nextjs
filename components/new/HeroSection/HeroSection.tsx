import Header from '../Header/Header'
import HeroBody from '../HeroBody/HeroBody'
import styles from './HeroSection.module.scss'

export default function HeroSection(props) {
    return (
        <div className={styles.heroSection}>
            <div className={styles.container}>
                <Header />
                <HeroBody
                    title={"Zenon Blockchain Explorer, web and API services."}
                    description={"Explore data stored on 19 blockchains"}
                />
            </div>
        </div>
    )
}

