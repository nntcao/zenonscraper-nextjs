import Image from 'next/image'
import styles from './Icon.module.scss'

export default function Icon(props) {
    return (
        <div className={styles.iconWrapper} style={{ width: props.width, height: props.height}}>
            <div className={`${styles.image}`}
                    style={props.style}
            >
                <Image src={props.src} width={props.width} height={props.height} alt={props.alt} />
            </div>
            {
                props.srcHover &&
                <div className={`${styles.image} ${styles.top}`}
                    style={props.style}
                >
                    <Image src={props.srcHover} width={props.width} height={props.height} />
                </div>
            }
        </div>    
    )
}