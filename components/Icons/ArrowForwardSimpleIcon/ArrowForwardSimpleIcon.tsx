import Icon from '../../GenericComponents/Icon/Icon'
import styles from './ArrowForwardSimpleIcon.module.scss'

export default function ArrowForwardSimpleIcon({width='40px', height='32px', className={}}) {
    return (
        <Icon className={className} src='/icons/arrow_forward_simple.svg' srcHover='/icons/arrow_forward_simple_hover.svg' width={width} height={height} />
    )
}