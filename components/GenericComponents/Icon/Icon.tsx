import Image from 'next/image'
import styles from './Icon.module.scss'

export default function Icon({ src, srcHover=undefined, width, height, style={}, alt='', className={}}) {
    return (
        <div className={`${styles.iconWrapper}`} style={{ width: width, height: height}}>
            <div className={`${styles.image} ${className}`} style={style}>
                <Image src={src} width={width} height={height} alt={alt} />
            </div>
            {
                srcHover &&
                <div className={`${styles.image} ${styles.top} ${className}`} style={style}>
                    <Image src={srcHover} width={width} height={height} />
                </div>
            }
        </div>    
    )
}