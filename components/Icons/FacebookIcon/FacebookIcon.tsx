import LinkWrapper from '../../GenericComponents/LinkWrapper/LinkWrapper'
import Icon from '../../GenericComponents/Icon/Icon'
import styles from './FacebookIcon.module.scss'

export default function FacebookIcon(props) {
    return (
        <LinkWrapper href=''>
            <Icon src='/icons/facebook.svg' srcHover='/icons/facebook-hover.svg' width='24px' height='24px' />
        </LinkWrapper>
    )
}