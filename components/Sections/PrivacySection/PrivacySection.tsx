import styles from './PrivacySection.module.scss'
import InformationSection from '../InformationSection/InformationSection'
import TextMedium from '../../GenericComponents/TextMedium/TextMedium'
import Title from '../../GenericComponents/Title/Title'
import Image from 'next/image'

export default function PrivacySection(props) {
    return (
        <InformationSection 
            text={
                <div className={styles.text}>
                    <Title>
                        Privacy is Our Paramount
                    </Title>
                    <div className={styles.textBody}>
                        <TextMedium>
                            Zenon Scraper is dedicated to blockchain search engine privacy.
                        </TextMedium>
                        <br />
                        <TextMedium>
                            Unlike most blockchain explorers and cryptocurrency companies, we do not share any personal data with third-party analytics companies or ad networks.
                        </TextMedium>   
                        <br />
                        <TextMedium>
                            When using our services you do not risk any personal identifiable information becoming public.
                        </TextMedium>   
                    </div>
                </div>
            }
            image={
                <div className={styles.imageWrapper}>
                    <Image src="/PrivacyImage.png" width={450} height={450}/>
                </div>
            }
            className={styles.container}
        />
    )
}