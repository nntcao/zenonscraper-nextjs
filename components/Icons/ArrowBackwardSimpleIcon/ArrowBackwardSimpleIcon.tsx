import Icon from '../../GenericComponents/Icon/Icon'
import styles from './ArrowBackwardSimpleIcon.module.scss'

export default function ArrowBackwardSimpleIcon({width='40px', height='32px', className={}}) {
    return (
        <Icon className={className} src='/icons/arrow_back_simple.svg' srcHover='/icons/arrow_back_simple_hover.svg' width={width} height={height} />
    )
}