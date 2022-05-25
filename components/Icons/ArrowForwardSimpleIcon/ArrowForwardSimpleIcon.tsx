import Icon from '../../GenericComponents/Icon/Icon'
import styles from './ArrowForwardSimpleIcon.module.scss'

export default function ArrowForwardSimpleIcon({width='16px', height='16px'}) {
    return (
        <Icon src='/icons/arrow_forward_simple.svg' srcHover='/icons/arrow_forward_simple_hover.svg' width={width} height={height} />
    )
}