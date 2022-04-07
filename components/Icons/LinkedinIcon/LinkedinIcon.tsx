import Icon from '../../GenericComponents/Icon/Icon'
import LinkWrapper from '../../GenericComponents/LinkWrapper/LinkWrapper'
import styles from './LinkedinIcon.module.scss'

export default function LinkedinIcon(props) {
    return (
        <LinkWrapper href='https://www.linkedin.com'>
            <Icon src='/icons/linkedin.svg' srcHover='/icons/linkedin-hover.svg' width='24px' height='24px' />
        </LinkWrapper>
    )
}