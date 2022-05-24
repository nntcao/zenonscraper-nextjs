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
                <LinkWrapper href="momentum_list">
                    <TextMedium className={styles.text}>Momentums</TextMedium>
                </LinkWrapper>
                <LinkWrapper href="/transaction_list">
                    <TextMedium className={styles.text}>Transactions</TextMedium>
                </LinkWrapper>
                <LinkWrapper href="/token_list">
                    <TextMedium className={styles.text}>Tokens</TextMedium>
                </LinkWrapper>
                <LinkWrapper href="/about">
                    <TextMedium className={styles.text}>About</TextMedium>
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