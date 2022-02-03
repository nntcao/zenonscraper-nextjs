import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Header.module.scss'
import { useEffect, useState } from 'react'

export default function Header() {

    const [isDesktop, setIsDesktop] = useState(true)

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
                        <a className={styles.logoWrapper}>
                            <Image src="/banner.png" width="63" height="29" alt="Zenon Scraper Logo"/>
                        </a>
                    </Link>
                    <NavigationBar isDesktop={isDesktop} />
                </div>
            </div>
       </nav>
    )
}

function NavigationBar({ isDesktop }) {
    if (isDesktop) {
        return <DesktopNavigationBar />
    } else {
        return <MobileNavigationBar />
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
                <a className={styles.optionsText}>Account Blocks</a>
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

function MobileNavigationBar() {
    return (
        <div className={styles.mobileNavigation}>
            <a className={styles.hamburgerMenuWrapper}>
                <Image src="/menu_black_48dp.svg" width="35" height="35" />
            </a>
        </div>
    )
}