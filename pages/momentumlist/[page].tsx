import * as db from '../../services/db'
import Layout from '../../components/Layout/Layout'
import styles from './MomentumList.module.scss'
import MomentumTable from '../../components/MomentumTable/MomentumTable'
import SearchBar from '../../components/Searchbar/Searchbar'
import Link from 'next/link'
import Image from 'next/image'

const numPerPage = 25

export async function getServerSideProps(context) {
    context.res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )

    const page: number = Number(context.params.page)

    const momentumBlockQuery = await db.query(`
        SELECT momentum.height, momentum.hash, momentum.timestamp, momentum.producer, a.countblocks 
            FROM (SELECT m.hash, COUNT(accountblock.hash) AS countblocks FROM
                (SELECT momentum.hash
                FROM momentum
                ORDER BY height DESC
                OFFSET $2
                LIMIT $1
                ) AS m
            LEFT OUTER JOIN accountblock
                ON m.hash = accountblock.momentumhash
                GROUP BY m.hash) as a
            INNER JOIN momentum 
                ON a.hash = momentum.hash
                ORDER BY momentum.height DESC
    `, [numPerPage, (page - 1) * numPerPage])


    return {
        props: {
            momentums: momentumBlockQuery?.rows ?? null,
            page: page ?? null,
        }
    }
}


export default function MomentumList({ momentums, page }) {
    return (
        <Layout>
            <div className={styles.main}>
                <div className={styles.searchBarWrapper}>
                    <SearchBar />
                </div>
                <div className={styles.card}>
                    <div className={styles.cardContent}>
                        <div className={styles.cardHeader}>
                            <div className={styles.cardHeaderLeft}>
                                <h2 className={styles.cardTitle}>Latest Momentums</h2>
                                <h2 className={styles.cardSubtitle}>Displaying {1 + (page - 1) * numPerPage} - {page * numPerPage}</h2>
                            </div>
                            <div className={styles.cardHeaderRight}>
                                <Pagination currentPage={page} />
                            </div>
                        </div>
                        <MomentumTable momentums={momentums} />
                    </div>
                    <div className={styles.paginationWrapper}>
                        <Pagination currentPage={page} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}


function Pagination({ currentPage }) {
    var pages: number[] = []
    if (currentPage == 1 || currentPage == 2) {
        for (let i = 1; i <6; i++) {
            pages.push(i)
        }
    } else {
        for (let i = -2; i < 3; i++) {
            if (!pages.includes(currentPage + i) && currentPage + i > 0) {
                pages.push(currentPage + i)
            }
        }
    }

    return (
        <div className={styles.pagination}>
            <BackArrow currentPage={currentPage} />
            <div className={styles.pageNumbers}>
                {pages.map(page => {
                    if (Number(page) === Number(currentPage)) {
                        return (
                            <div key={page} className={`${styles.pageText} ${styles.strongText}`}>
                                {page}
                            </div>
                        )
                    } else {
                        return (
                            <Link key={page} href={{ pathname: '/momentumlist/[page]', query: { page: page } }} scroll={false}>
                                <a className={`${styles.pageLink} ${styles.pageText}`}>{page}</a>
                            </Link>
                        )
                    }
                })}
            </div>
            <ForwardArrow currentPage={currentPage} />
        </div>
    )
}

function ForwardArrow({ currentPage }) {
    if (currentPage + 1 <= 0) {
        return <div className={styles.imageSpacer}></div>
    }
    return (
        <Link href={{ pathname: '/momentumlist/[page]', query: { page: currentPage + 1 } }} scroll={false}>
            <a className={`${styles.pageLink} ${styles.imageFilterToBlack}`}>
                <Image src="/keyboard_arrow_right_black_24dp.svg" alt="go forward one page" width={24} height={24} />
            </a>
        </Link>
    )
}

function BackArrow({ currentPage }) {
    if (currentPage - 1 <= 0) {
        return <div className={styles.imageSpacer}></div>
    }
    return (
        <Link href={{ pathname: '/momentumlist/[page]', query: { page: currentPage - 1 } }} scroll={false}>
            <a className={`${styles.pageLink} ${styles.imageFilterToBlack}`}>
                <Image src="/keyboard_arrow_left_black_24dp.svg" alt="go back one page" width={24} height={24} />
            </a>
        </Link>
    )
}