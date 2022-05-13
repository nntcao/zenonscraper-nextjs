import LinkWrapper from '../../GenericComponents/LinkWrapper/LinkWrapper'
import Subtitle from '../../GenericComponents/Subtitle/Subtitle'
import TextGlow from '../../GenericComponents/TextGlow/TextGlow'
import TextMedium from '../../GenericComponents/TextMedium/TextMedium'
import styles from './Footer.module.scss'


export default function Footer(props) {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.options}>

                </div>
                <div className={styles.bottom}>
                    <div className={styles.copyright}>
                        <Subtitle className={styles.robotoBold}><TextGlow>Zenon Scraper</TextGlow></Subtitle>
                        <TextMedium>© 2022 Zenon Scraper. All rights reserved</TextMedium>
                    </div>
                    <div className={styles.legal}>
                        <LinkWrapper href="">
                            <TextMedium>Terms of Service</TextMedium>
                        </LinkWrapper>
                        <LinkWrapper href="">
                            <TextMedium>Privacy Policy</TextMedium>
                        </LinkWrapper>
                    </div>
                </div>
            </div>
        </section>
    )
}