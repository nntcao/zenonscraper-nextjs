import LinkTextMedium from '../../GenericComponents/LinkTextMedium/LinkTextMedium'
import styles from './HeaderLinks.module.scss'

export default function HeaderLinks(props) {
    return (
        <div className={styles.content}>
            <LinkTextMedium href={"https://www.zenonscraper.com"}>About</LinkTextMedium>
            <LinkTextMedium href={"https://www.zenonscraper.com"}>API Guidelines</LinkTextMedium>
            <LinkTextMedium href={"https://www.zenonscraper.com"}>Security</LinkTextMedium>
        </div>
    )
}