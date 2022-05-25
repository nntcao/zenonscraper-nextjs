import LinkWrapper from '../../GenericComponents/LinkWrapper/LinkWrapper'
import Subtitle from '../../GenericComponents/Subtitle/Subtitle'
import TextGlow from '../../GenericComponents/TextGlow/TextGlow'
import TextMedium from '../../GenericComponents/TextMedium/TextMedium'
import LinkedinIcon from '../../Icons/LinkedinIcon/LinkedinIcon'
import FacebookIcon from '../../Icons/FacebookIcon/FacebookIcon'
import TwitterIcon from '../../Icons/TwitterIcon/TwitterIcon'
import InstagramIcon from '../../Icons/InstagramIcon/InstagramIcon'
import styles from './Footer.module.scss'


export default function Footer(props) {
    return (
        <footer className={styles.section}>
            <div className={styles.container}>
                <div className={styles.options}>
                    <div className={styles.column}>
                        <TextMedium><TextGlow>Our Website</TextGlow></TextMedium>
                        <div className={styles.columnBody}>
                            <LinkWrapper href="">
                                <TextMedium>Home</TextMedium>
                            </LinkWrapper>
                            <LinkWrapper href="">
                                <TextMedium>About</TextMedium>
                            </LinkWrapper>
                            <LinkWrapper href="">
                                <TextMedium>API Guidelines</TextMedium>
                            </LinkWrapper>
                            <LinkWrapper href="">
                                <TextMedium>Security</TextMedium>
                            </LinkWrapper>
                        </div>
                    </div>
                    <div className={styles.column}>
                        <TextMedium><TextGlow>Data</TextGlow></TextMedium>
                        <div className={styles.columnBody}>
                            <LinkWrapper href="">
                                <TextMedium>Momentums</TextMedium>
                            </LinkWrapper>
                            <LinkWrapper href="">
                                <TextMedium>Account Blocks</TextMedium>
                            </LinkWrapper>
                            <LinkWrapper href="">
                                <TextMedium>Tokens</TextMedium>
                        </LinkWrapper>
                            <LinkWrapper href="">
                                <TextMedium>Charts</TextMedium>
                            </LinkWrapper>
                        </div>
                    </div>
                    <div className={styles.column}>
                        <TextMedium><TextGlow>Resources</TextGlow></TextMedium>
                        <div className={styles.columnBody}>
                            <LinkWrapper href="">
                                <TextMedium>Zenon Scraper Newsletter</TextMedium>
                            </LinkWrapper>
                            <LinkWrapper href="">
                                <TextMedium>Network Status</TextMedium>
                            </LinkWrapper>
                        </div>
                    </div>
                    <div className={styles.column}>
                        <TextMedium><TextGlow>Products and Services</TextGlow></TextMedium>
                        <div className={styles.columnBody}>
                            <LinkWrapper href="">
                                <TextMedium>Explorer-as-a-Service (EaaS)</TextMedium>
                            </LinkWrapper>
                            <LinkWrapper href="">
                                <TextMedium>API Services</TextMedium>
                            </LinkWrapper>
                        </div>
                    </div>
                    <div className={styles.column}>
                        <div className={styles.column}>
                            <TextMedium><TextGlow>Contact</TextGlow></TextMedium>
                            <div className={styles.columnBody}>
                                <LinkWrapper href="">
                                    <TextMedium>vovinhivo@gmail.com</TextMedium>
                                </LinkWrapper>
                                <div className={styles.socialMedia}>
                                    <LinkedinIcon />
                                    <TwitterIcon />
                                    <FacebookIcon />
                                    <InstagramIcon />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.copyright}>
                        <Subtitle className={styles.robotoBold}><TextGlow>Zenon Scraper</TextGlow></Subtitle>
                        <TextMedium>© 2022 Zenon Scraper. All rights reserved</TextMedium>
                    </div>
                    <div className={styles.legal}>
                        <LinkWrapper href="">
                            <TextMedium><TextGlow className={styles.underline}>Terms of Service</TextGlow></TextMedium>
                        </LinkWrapper>
                        <LinkWrapper href="">
                            <TextMedium><TextGlow className={styles.underline}>Privacy Policy</TextGlow></TextMedium>
                        </LinkWrapper>
                    </div>
                </div>
            </div>
        </footer>
    )
}