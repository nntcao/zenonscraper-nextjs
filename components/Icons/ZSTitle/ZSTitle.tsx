import styles from './ZSTitle.module.scss'
import Icon from '../../GenericComponents/Icon/Icon';
import LinkWrapper from '../../GenericComponents/LinkWrapper/LinkWrapper';

export default function ZSTitle(props) {
    return (
        <LinkWrapper href="https://www.zenonscraper.com">
            <Icon src='/icons/zenon-scraper-logo.svg' srcHover='/icons/zenon-scraper-logo-hover.svg' width='205px' height='48px'/>
        </LinkWrapper>
    )
}