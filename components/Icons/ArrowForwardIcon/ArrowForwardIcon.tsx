import Icon from '../../GenericComponents/Icon/Icon'
import styles from './ArrowForwardIcon.module.scss'

export default function ArrowForwardIcon({width='25px', height='25px'}) {
    return (
        <Icon src='/icons/arrow-forward.svg' srcHover='/icons/arrow-forward.svg' width={width} height={height} />
    )
}