import styles from './Searchbar.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState, createRef } from 'react'
import { ThreeDots } from 'react-loader-spinner'

export function Searchbar() {

    const router = useRouter()
    const [query, setQuery] = useState('')
    const [isDropDown, setDropDown] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [suggestions, setSuggestions] = useState([])
    const [suggestionsRef, setSuggestionsRef] = useState([])
    const dropDownMenuRef = useRef(null)

    useOutsideAlerter(dropDownMenuRef, () => setDropDown(false))

    useEffect(() => {
        const fetchSearchSuggestions = async () => {
            setDropDown(true)
            setIsLoading(true)
            const cleanedQuery = query.trim()
            if (cleanedQuery === '') {
                setDropDown(false)
                setSuggestionsRef((suggestionsRef) => Array([].length + 1).fill(createRef()).map((_, i) => suggestionsRef[i] ?? createRef()))
                setSuggestions([])
            } else {
                const res = await fetch(`${window.location.origin}/api/search?query=${cleanedQuery}`)
                const json = await res.json()
                setSuggestionsRef((suggestionsRef) => Array([...json].length + 1).fill(createRef()).map((_, i) => suggestionsRef[i] ?? createRef()))
                setSuggestions([...json])
            }
            setIsLoading(false)
        }
        fetchSearchSuggestions()
    }, [query])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (query !== '') {
            if (isLoading) {
                const cleanedQuery = query.trim()
                const res = await fetch(`${window.location.origin}/api/search?query=${cleanedQuery}`)
                const tempSuggestions = await res.json()

                if (tempSuggestions.length > 0) {
                    router.push({
                        pathname: tempSuggestions[1].url
                    })
                } else {
                    router.push({
                        pathname: '/404'
                    })
                }    
            } else {
                if (suggestions.length > 0) {
                    router.push({
                        pathname: suggestions[1].url
                    })
                } else {
                    router.push({
                        pathname: '/404'
                    })
                }    
            }
        }
    }
    const handleParam = setValue => e => {
        if (suggestions.length != 0) {
            setDropDown(true)
        }
        setValue(e.target.value)
    }
    const onClickFocusInput = () => {
        document.getElementById('searchbar').focus()
        return false
    }
    const closeDropDownMenu = () => {
        setDropDown(false)
        setQuery('')
    }

    if (isDropDown) {
        return (
            <>
                <div
                    className={styles.inputWrapper}
                    ref={dropDownMenuRef}
                >
                    <form onClick={onClickFocusInput} className={`${styles.search} ${isDropDown ? styles.searchOnDropDown : ""}`} onSubmit={handleSubmit}>
                        <input
                            id="searchbar"
                            type="text"
                            className={styles.searchbar}
                            placeholder={''}
                            value={query}
                            onChange={handleParam(setQuery)}
                            autoComplete="off"
                            onFocus={handleParam(setQuery)}
                            ref={suggestionsRef[0]}
                        />
                        <button className={`${styles.button} ${styles.searchIcon}`} type="submit" tabIndex={-1}>
                            <Image src="/search_black_24dp.svg" width="25" height="25" alt="Search Bar Icon" />
                        </button>
                    </form>
                    <div id="dropdown" className={`${styles.dropDownMenu}`}>
                        <div className={styles.breakLine} />
                        <DropDownMenu isLoading={isLoading} dropDownSuggestions={suggestions} suggestionsRef={suggestionsRef} closeDropDownMenu={closeDropDownMenu}/>
                    </div>
                </div>
            </>
        )            
    } else {
        return (
            <>
                <div
                    className={styles.inputWrapper}
                    ref={dropDownMenuRef}
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
                            onFocus={handleParam(setQuery)}
                            ref={suggestionsRef[0]}
                        />
                        <button className={`${styles.button} ${styles.searchIcon}`} type="submit" tabIndex={-1}>
                            <Image src="/search_black_24dp.svg" width="25" height="25" alt="Search Bar Icon" />
                        </button>
                    </form>
                </div>
            </>
        )            
    }
}

function DropDownMenu({ isLoading, dropDownSuggestions, suggestionsRef, closeDropDownMenu }) {
    if (isLoading) {
        return (
            <ul className={styles.dropDownMenuList}>
                <ThreeDots color='#00C800' wrapperClass={styles.threeDotsWrapper} width={60} height={60} />
            </ul>
        )
    } else {
        return <Suggestions dropDownSuggestions={dropDownSuggestions} suggestionsRef={suggestionsRef} closeDropDownMenu={closeDropDownMenu}/>
    }
}

function Suggestions({ dropDownSuggestions, suggestionsRef, closeDropDownMenu }) {
    const [indexDropDown, setIndexDropDown] = useState(0)

    useEffect(() => {
        function handleArrowUp(event) {
            const indexElementToFocus = indexDropDown - 1 >= 0 ? indexDropDown - 1 : suggestionsRef.length - 1
            if (suggestionsRef[indexElementToFocus]?.current) {
                suggestionsRef[indexElementToFocus].current?.focus()
                setIndexDropDown(indexElementToFocus)
            }
        }
        function handleArrowDown(event) {
            const indexElementToFocus = indexDropDown + 1 < suggestionsRef.length ? indexDropDown + 1 : 0
            if (suggestionsRef[indexElementToFocus]?.current) {
                suggestionsRef[indexElementToFocus].current?.focus()
                setIndexDropDown(indexElementToFocus)
            }
        }
        function handleKeyDown(event) {
            if (event.key === "ArrowUp") {
                event.preventDefault()
                event.stopPropagation()
                handleArrowUp(event)
            }
            else if (event.key === "ArrowDown") {
                event.preventDefault()
                event.stopPropagation()
                handleArrowDown(event)
            }
        }

        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
    })

    if (dropDownSuggestions.length == 0) {
        return (
            <ul className={styles.dropDownMenuList}>
                <li>
                    <div className={styles.dropDownMenuElement}>
                        <span 
                            className={`${styles.dropDownText} ${styles.italicsDropDownText}`}
                            ref={suggestionsRef[1]}
                        >
                            No results found
                        </span>
                    </div>
                </li>
            </ul>
        )
    } else {
        return (
            <ul className={styles.dropDownMenuList}>
                {dropDownSuggestions?.map((suggestion, i) => {
                    return (
                        <li key={suggestion.val}>
                            <Link href={suggestion.url}>
                                <a 
                                    className={styles.dropDownMenuElement}
                                    ref={suggestionsRef[i + 1]}
                                    onClick={closeDropDownMenu}
                                >
                                    <div className={`${styles.searchIcon} ${styles.dropDownIcon}`}>
                                        <Image src="/search_black_24dp.svg" width="25" height="25" alt="Search Bar Icon" />
                                    </div>
                                    <span className={styles.dropDownText}><span className={styles.boldedDropDownText}>{suggestion.type}:</span> {suggestion.val}</span>
                                </a>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        )
    }

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

export default Searchbar