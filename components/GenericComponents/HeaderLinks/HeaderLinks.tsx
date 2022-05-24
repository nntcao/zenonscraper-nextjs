import LinkWrapper from '../LinkWrapper/LinkWrapper'
import TextMedium from '../TextMedium/TextMedium'
import FacebookIcon from '../../Icons/FacebookIcon/FacebookIcon'
import InstagramIcon from '../../Icons/InstagramIcon/InstagramIcon'
import LinkedinIcon from '../../Icons/LinkedinIcon/LinkedinIcon'
import TwitterIcon from '../../Icons/TwitterIcon/TwitterIcon'
import styles from './HeaderLinks.module.scss'

export default function HeaderLinks(props) {
    return (
        <div className={styles.content}>
            <div className={styles.textLinks}>
                <LinkWrapper href="https://www.zenonscraper.com">
                    <TextMedium className={styles.text}>About</TextMedium>
                </LinkWrapper>
                <LinkWrapper href="https://www.zenonscraper.com">
                    <TextMedium className={styles.text}>API Guidelines</TextMedium>
                </LinkWrapper>
                <LinkWrapper href="https://www.zenonscraper.com">
                    <TextMedium className={styles.text}>Security</TextMedium>
                </LinkWrapper>
            </div>
            <div className={styles.iconLinks}>
                <LinkedinIcon />
                <TwitterIcon />
                <FacebookIcon />
                <InstagramIcon />
            </div>
        </div>
    )
}