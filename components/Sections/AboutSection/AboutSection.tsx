import TextMedium from '../../GenericComponents/TextMedium/TextMedium'
import Title from '../../GenericComponents/Title/Title'
import styles from './AboutSection.module.scss'
import Image from 'next/image'

export default function AboutSection(props) {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.text}>
                    <Title>
                        We develop products that make Zenon Network blockchain data accessible to individuals, development teams, and research organizations
                    </Title>
                    <div className={styles.textBody}>
                        <TextMedium>
                            Zenon Scraper is the first community blockchain explorer for the Zenon Network that incorporates real-time data capture and visualization.
                        </TextMedium>
                        <br />
                        <TextMedium>
                            Now, we are striving to make blockchain data on the Zenon Network understandable and accessible for a wide and varied audience interested in crypto, while maintaining the privacy of our users as paramount.
                        </TextMedium>   
                    </div>
                </div>
                <div className={styles.imageWrapper}>
                    <Image src="/AboutSectionImage.png" width={450} height={450}/>
                </div>
            </div>
        </section>
    )
}