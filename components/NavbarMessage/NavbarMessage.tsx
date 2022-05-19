import styles from './NavbarMessage.module.scss'

export default function NavbarMessage({ children={} }) {
    return (
        <div className={styles.bar}>
            { children }
        </div>
    )
}