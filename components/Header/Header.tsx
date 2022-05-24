import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Header.module.scss'
import { useEffect, useState } from 'react'

export default function Header() {

    const [isDesktop, setIsDesktop] = useState(true)
    const [showNavigation, setShowNavigation] = useState(false)

    useEffect(() => {
        setIsDesktop(window.innerWidth > 1450)

        const updateMedia = () => {
            setIsDesktop(window.innerWidth > 1450)
        }

        window.addEventListener('resize', updateMedia)
        return () => window.removeEventListener('resize', updateMedia)
    }, [])

    return (
        <nav>
            <div className={styles.header}>
                <div className={styles.container}>
                    <Link href='/'>
                        <a className={`${styles.logoWrapper} ${showNavigation && styles.logoWrapperHamburgerMenu}`}>
                            {/* <Image src="/banner.png" width="63" height="29" alt="Zenon Scraper Logo" /> */}
                            <div className={styles.logoImage}>
                                <Image src="/banner.png" width="63" height="29" alt="Zenon Scraper Logo" />
                            </div>
                            <span className={styles.headerTitle}>Zenon Scraper</span>
                        </a>
                    </Link>
                    <NavigationBar isDesktop={isDesktop} showNavigation={showNavigation} setShowNavigation={setShowNavigation} />
                </div>
            </div>
        </nav>
    )
}

function NavigationBar({ isDesktop, showNavigation, setShowNavigation }) {
    if (isDesktop) {
        return <DesktopNavigationBar />
    } else {
        return <MobileNavigationBar showNavigation={showNavigation} setShowNavigation={setShowNavigation}/>
    }
}

function DesktopNavigationBar() {
    return (
        <div className={styles.options}>
            <Link href='/'>
                <a className={styles.optionsText}>Home</a>
            </Link>
            <Link href='/momentumlist/1'>
                <a className={styles.optionsText}>Momentums</a>
            </Link>
            <Link href='/accountblocklist/1'>
                <a className={styles.optionsText}>Transactions</a>
            </Link>
            <Link href='/tokenlist'>
                <a className={styles.optionsText}>Tokens</a>
            </Link>
            <Link href='/resources'>
                <a className={styles.optionsText}>Resources</a>
            </Link>
            <Link href='/donate'>
                <a className={styles.optionsText}>Donate</a>
            </Link>
        </div>
    )
}

function MobileNavigationBar({showNavigation, setShowNavigation}) {

    if (showNavigation) {
        return (
            <div className={`${styles.wholeScreen}`}>
                <div className={`${styles.sideMenu}`}>
                    <button className={styles.imageExit} onClick={() => setShowNavigation(false)}>
                        <Image src="/close_black_24dp.svg" width={36} height={36} />
                    </button>
                    <Link href='/'>
                        <a className={styles.optionsText}>Home</a>
                    </Link>
                    <Link href='/momentumlist/1'>
                        <a className={styles.optionsText}>Momentums</a>
                    </Link>
                    <Link href='/accountblocklist/1'>
                        <a className={styles.optionsText}>Transactions</a>
                    </Link>
                    <Link href='/tokenlist'>
                        <a className={styles.optionsText}>Tokens</a>
                    </Link>
                    <Link href='/resources'>
                        <a className={styles.optionsText}>Resources</a>
                    </Link>
                    <Link href='/donate'>
                        <a className={styles.optionsText}>Donate</a>
                    </Link>
                </div>
            </div>
        )
    }
    return (
        <div className={styles.mobileNavigation}>
            <button className={styles.hamburgerMenuWrapper} onClick={() => setShowNavigation(!showNavigation)}>
                <Image src="/menu_black_48dp.svg" width="35" height="35" />
            </button>
        </div>
    )
}