import styles from './Searchbar.module.scss'
import Image from 'next/image'

export function Searchbar() {
    const onSearchHandler = () => { 

    }

    return (
        <>
            <form className={styles.search} onSubmit={onSearchHandler}>
                <input type="text" className={styles.searchbar} placeholder={`Search for addresses/tokens/momentums/account blocks`}/>
                <button className={styles.button}>
                    <Image src="/../public/search_black_24dp.svg" width="25" height="25" className={styles.searchIcon}/>
                </button>
            </form>
        </>
    )
}

export default Searchbar