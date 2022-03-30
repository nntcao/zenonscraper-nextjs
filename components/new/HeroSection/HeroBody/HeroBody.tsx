import Title from "../../GenericComponents/Title/Title"
import TextMedium from "../../GenericComponents/TextMedium/TextMedium"
import styles from './HeroBody.module.scss'
import SearchBarWithText from "../SearchBarWithText/SearchBarWithText"

export default function HeroBody({ title, description }) {
    return (
        <div className={styles.heroBody}>
            <div className={styles.heroText}>
                <Title>{ title }</Title>
                <TextMedium>{ description }</TextMedium>
            </div>
            <SearchBarWithText />
        </div>
    )
}