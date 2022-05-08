import Datablock from './Datablock/Datablock'
import SubtextMedium from '../../../GenericComponents/SubtextMedium/SubtextMedium'
import styles from './GeneralDashboard.module.scss'
import TextMedium from '../../../GenericComponents/TextMedium/TextMedium'
import Icon from '../../../GenericComponents/Icon/Icon'
import Card from '../../../GenericComponents/Card/Card'
import HashRateChart from '../../../Charts/HashRateChart/HashRateChart'

export default function GeneralDashboard(props) {
    return (
        <Card>
            <div className={styles.generalInfoDashboard}>
                <div className={styles.column}>
                    <Datablock
                        icon={<Icon src='/icons/znn.svg' srcHover='/icons/znn-hover.svg' width={32} height={32} />}
                        title={<SubtextMedium>ZNN</SubtextMedium>}
                        text={
                            <>
                                <TextMedium>$5.08 &nbsp;</TextMedium>
                                <SubtextMedium> @0.0743 BTC</SubtextMedium>
                            </>
                        }
                    />
                    <hr className={styles.hr} />
                    <Datablock
                        icon={<Icon src='/icons/znn.svg' srcHover='/icons/znn-hover.svg' width={32} height={32} />}
                        title={<SubtextMedium>MARKET CAP</SubtextMedium>}
                        text={
                            <>
                                <TextMedium>$45,975,497</TextMedium>
                            </>
                        }
                    />
                </div>
                <div className={styles.vr} />
                <div className={styles.column}>
                    <div className={styles.middleColumn}>
                        <Datablock
                            icon={<Icon src='/icons/znn.svg' srcHover='/icons/znn-hover.svg' width={32} height={32} />}
                            title={<SubtextMedium>ZNN</SubtextMedium>}
                            text={
                                <>
                                    <TextMedium>$5.08 &nbsp;</TextMedium>
                                    <SubtextMedium> @0.0743 BTC</SubtextMedium>
                                </>
                            }
                        />
                        <Datablock
                            icon={<></>}
                            title={<SubtextMedium>ZNN</SubtextMedium>}
                            text={
                                <>
                                    <TextMedium>$5.08 &nbsp;</TextMedium>
                                    <SubtextMedium> @0.0743 BTC</SubtextMedium>
                                </>
                            }
                            reverse={true}
                        />
                    </div>
                    <hr className={styles.hr} />
                    <div className={styles.middleColumn}>
                        <Datablock
                            icon={<Icon src='/icons/znn.svg' srcHover='/icons/znn-hover.svg' width={32} height={32} />}
                            title={<SubtextMedium>ZNN</SubtextMedium>}
                            text={
                                <>
                                    <TextMedium>$5.08 &nbsp;</TextMedium>
                                    <SubtextMedium> @0.0743 BTC</SubtextMedium>
                                </>
                            }
                        />
                        <Datablock
                            icon={<></>}
                            title={<SubtextMedium>ZNN</SubtextMedium>}
                            text={
                                <>
                                    <TextMedium>$5.08 &nbsp;</TextMedium>
                                    <SubtextMedium> @0.0743 BTC</SubtextMedium>
                                </>
                            }
                            reverse={true}
                        />
                    </div>
                </div>
                <div className={styles.vr} />
                <div className={`${styles.column} ${styles.chartWrapper}`}>
                    <HashRateChart />
                </div>
            </div>
        </Card>
    )
}