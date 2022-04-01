import Icon from '../../GenericComponents/Icon/Icon'
import LinkWrapper from '../../GenericComponents/LinkWrapper/LinkWrapper'
import styles from './TwitterIcon.module.scss'

export default function TwitterIcon(props) {
    return (
        <LinkWrapper href=''>
            <Icon src='/icons/twitter.svg' srcHover='/icons/twitter-hover.svg' width='24px' height='24px' />
        </LinkWrapper>
    )
}