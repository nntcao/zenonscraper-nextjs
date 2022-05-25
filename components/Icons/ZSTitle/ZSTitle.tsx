import styles from './ZSTitle.module.scss'
import Icon from '../../GenericComponents/Icon/Icon';
import LinkWrapper from '../../GenericComponents/LinkWrapper/LinkWrapper';

export default function ZSTitle({ width='205px', height='48px' }) {
    return (
        <LinkWrapper href="/">
            {/* 205px 48px before */}
            <Icon src='/icons/zenon-scraper-logo.svg' srcHover='/icons/zenon-scraper-logo-hover.svg' width={ width } height={ height }/>
        </LinkWrapper>
    )
}