import styles from './Searchbar.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'

const searchApiURL = 'http://localhost:3000/api/search'

export function Searchbar() {

    const router = useRouter()
    const [query, setQuery] = useState('')
    const [isDropDown, setDropDown] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [dropDownSuggestions, setDropDownSuggestions] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault()
        if (query.length > 7) {
            if (query.substring(0, 3).toLowerCase() === 'z1q') {
                router.push({
                    pathname: '/address/[address]',
                    query: { address: query }
                })
            } else if (query.substring(0, 3).toLowerCase() === 'zts') {
                router.push({
                    pathname: '/token/[token]',
                    query: { address: query }
                })
            } else {
                router.push({
                    pathname: '/accountblock/[accountblock]',
                    query: { accountblock: query }
                })
            }
        } else if (!isNaN(Number(query))) {
            router.push({
                pathname: '/momentum/[momentum]',
                query: { momentum: query }
            })
        } else {
            router.push({
                pathname: '/token/[token]',
                query: { token: query }
            })
        }
    }
    const handleParam = setValue => e => setValue(e.target.value)
    const onClickFocusInput = () => {
        document.getElementById('searchbar').focus()
        return false
    }

    useEffect(() => {
        const fetchSearchSuggestions = async () => {
            setIsLoading(true)
            const res = await fetch(`${searchApiURL}?query=${query}`)
            const json = await res.json()

            setIsLoading(false)
            setDropDownSuggestions([...json])
        }
        fetchSearchSuggestions()
    }, [query])

    const wrapperRef = useRef(null)
    useOutsideAlerter(wrapperRef, () => setDropDown(false))

    return (
        <>
            <div 
                className={styles.inputWrapper} 
                ref={wrapperRef}
            >
                <form onClick={onClickFocusInput} className={`${styles.search} ${isDropDown ? styles.searchOnDropDown : ""}`} onSubmit={handleSubmit}>
                    <input
                        id="searchbar"
                        type="text"
                        className={styles.searchbar}
                        placeholder={isDropDown ? '' : `Search for addresses/tokens/momentums/txns`}
                        value={query}
                        onChange={handleParam(setQuery)}
                        autoComplete="off"
                        onFocus={() => { setDropDown(true) }}
                    />
                    <button className={`${styles.button} ${styles.searchIcon}`} type="submit">
                        <Image src="/search_black_24dp.svg" width="25" height="25" alt="Search Bar Icon" />
                    </button>
                </form>
                <div id="dropdown" className={`${styles.dropDownMenu} ${!isDropDown ? styles.hidden : ''}`}>
                    <div className={styles.breakLine} />
                    <ul className={styles.dropDownMenuList}>
                        <LoadingIndicator isLoading={isLoading} />
                        {dropDownSuggestions?.map((suggestion) => {
                            return (
                                <li key={suggestion.val}>
                                    <Link href={suggestion.url}>
                                        <div className={styles.dropDownMenuElement}>
                                            <div className={styles.searchIcon}>
                                                <Image src="/search_black_24dp.svg" width="25" height="25" alt="Search Bar Icon" />
                                            </div>
                                            <span className={styles.dropDownText}><span className={styles.boldedDropDownText}>{suggestion.type}:</span> {suggestion.val}</span>
                                        </div>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}

function useOutsideAlerter(ref, handleClickOutside) {
    useEffect(() => {
        function checkClickLocation(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                handleClickOutside()
            }
        }
        
        document.addEventListener("mousedown", checkClickLocation)
        return () => {
            document.removeEventListener("mousedown", checkClickLocation)
        }
    })
}

function useKeyPress(ref) {

}

function LoadingIndicator(isLoading: boolean) {
    if (isLoading === true) {
        return <ThreeDots />
    } else {
        return null
    }
}

export default Searchbar