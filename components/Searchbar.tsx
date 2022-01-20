import styles from './Searchbar.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'


export function Searchbar() {

    const router = useRouter()
    const [query, setQuery] = useState('')

    const handleSubmit = (e) => { 
        e.preventDefault()
        if (query.length >= 3) {
            if (query.substring(0,3).toLowerCase() === 'z1q') {
                router.push({
                    pathname: '/address/[address]',
                    query: {address: query}
                })
            } else if (query.substring(0,3).toLowerCase() === 'zts') {
                router.push({
                    pathname: '/token/[token]',
                    query: {address: query}
                })
            } else if (!isNaN(Number(query))) {
                router.push({
                    pathname: '/momentum/[momentum]',
                    query: {momentum: query}
                })
            } else {
                router.push({
                    pathname: '/accountblock/[accountblock]',
                    query: {accountblock: query}
                })
            }
        }
    }
    const handleParam = setValue => e => setValue(e.target.value)

    return (
        <>
            <form className={styles.search} onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    className={styles.searchbar} 
                    placeholder={`Search for addresses/tokens/momentums/account blocks`}
                    value={query}
                    onChange={handleParam(setQuery)}
                />
                <button className={styles.button} type="submit">
                    <Image src="/search_black_24dp.svg" width="25" height="25" className={styles.searchIcon}/>
                </button>
            </form>
        </>
    )
}

export default Searchbar