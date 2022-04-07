import LinkWrapper from '../../GenericComponents/LinkWrapper/LinkWrapper'
import Icon from '../../GenericComponents/Icon/Icon'
import styles from './InstagramIcon.module.scss'

export default function InstagramIcon(props) {
    return (
        <LinkWrapper href='https://www.instagram.com'>
            <Icon src='/icons/instagram.svg' srcHover='/icons/instagram-hover.svg' width='24px' height='24px' />
        </LinkWrapper>
    )
}