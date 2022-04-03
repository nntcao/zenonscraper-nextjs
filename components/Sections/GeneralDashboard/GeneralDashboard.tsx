import Datablock from './Datablock/Datablock'
import SubtextMedium from '../../GenericComponents/SubtextMedium/SubtextMedium'
import styles from './GeneralDashboard.module.scss'
import TextMedium from '../../GenericComponents/TextMedium/TextMedium'
import Icon from '../../GenericComponents/Icon/Icon'
import Card from '../../GenericComponents/Card/Card'

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
                        title={<SubtextMedium>ZNN</SubtextMedium>}
                        text={
                            <>
                                <TextMedium>$5.08 &nbsp;</TextMedium>
                                <SubtextMedium> @0.0743 BTC</SubtextMedium>
                            </>
                        }
                    />
                </div>
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
                        title={<SubtextMedium>ZNN</SubtextMedium>}
                        text={
                            <>
                                <TextMedium>$5.08 &nbsp;</TextMedium>
                                <SubtextMedium> @0.0743 BTC</SubtextMedium>
                            </>
                        }
                    />
                </div>
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
                        title={<SubtextMedium>ZNN</SubtextMedium>}
                        text={
                            <>
                                <TextMedium>$5.08 &nbsp;</TextMedium>
                                <SubtextMedium> @0.0743 BTC</SubtextMedium>
                            </>
                        }
                    />
                </div>
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
                        title={<SubtextMedium>ZNN</SubtextMedium>}
                        text={
                            <>
                                <TextMedium>$5.08 &nbsp;</TextMedium>
                                <SubtextMedium> @0.0743 BTC</SubtextMedium>
                            </>
                        }
                    />
                </div>
            </div>
        </Card>
    )
}