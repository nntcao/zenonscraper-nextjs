import styles from './Card.module.scss'

export default function Card({ children=undefined, className='', style={} }) {
    return (
        <div className={`${styles.card} ${className}`} style={style}>
            { children }
        </div>
    )
}