import InformationSection from '../InformationSection/InformationSection'
import styles from './ApiSection.module.scss'
import TextMedium from '../../GenericComponents/TextMedium/TextMedium'
import Title from '../../GenericComponents/Title/Title'
import Image from 'next/image'

export default function ApiSection(props) {
    return (
        <InformationSection 
            text={
                <div className={styles.text}>
                    <Title>
                        1 API for the Zenon Network Blockchain
                    </Title>
                    <div className={styles.textBody}>
                        <TextMedium>
                            Join us as a Zenon developer and utilize Zenon Scrapers REST API to fetch data and power your project
                        </TextMedium>
                        <br />
                        <ul>
                            <li className={styles.listItem}>
                                <TextMedium>Never-ending data insight for the Zenon Network blockchain</TextMedium>
                            </li>
                            <li className={styles.listItem}>
                                <TextMedium>Set and filter data with SQL-esque queries</TextMedium>
                            </li>
                            <li className={styles.listItem}>
                                <TextMedium>Pull generated statistics from our data system</TextMedium>
                            </li>
                        </ul>
                    </div>
                </div>
            }
            image={
                <div className={styles.imageWrapper}>
                    <Image src="/ApiImage.png" width={450} height={450}/>
                </div>
            }
            reverse={true}
            className={styles.container}
        />
    )
}