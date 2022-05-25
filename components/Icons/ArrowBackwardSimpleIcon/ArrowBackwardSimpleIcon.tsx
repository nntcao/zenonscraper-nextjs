import Icon from '../../GenericComponents/Icon/Icon'
import styles from './ArrowBackwardSimpleIcon.module.scss'

export default function ArrowBackwardSimpleIcon({width='16px', height='16px'}) {
    return (
        <Icon src='/icons/arrow_back_simple.svg' srcHover='/icons/arrow_back_simple_hover.svg' width={width} height={height} />
    )
}