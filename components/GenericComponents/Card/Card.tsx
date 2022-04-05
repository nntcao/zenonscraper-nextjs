import styles from './Card.module.scss'

export default function Card({ children=undefined, className='' }) {
    return (
        <div className={`${styles.card} ${className}`}>
            { children }
        </div>
    )
}