import * as db from '../../services/db'
import Layout from '../../components/Layout'
import styles from './MomentumList.module.scss'
import MomentumTable from '../../components/MomentumTable'
import SearchBar from '../../components/Searchbar'
import Link from 'next/link'

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

    const momentumCountQuery = await db.query(`
        SELECT COUNT(hash) as countmomentum FROM momentum
    `)
    
    return { 
        props: {
            momentums: momentumBlockQuery?.rows ?? null,
            page: page ?? null,
            momentumCount: momentumCountQuery?.rows[0]?.countmomentum ?? null
        }
    }
}


export default function MomentumList({ momentums, page, momentumCount }) {
    return (
        <Layout>
            <div className={styles.main}>
                <SearchBar />
                <h2 className={styles.tableTitle}>Momentums</h2>
                <h2 className={styles.tableTitle}>Page {page}</h2>
                <MomentumTable momentums={momentums}/>
                <Choices currentPage={page} count={momentumCount}/>
            </div>
        </Layout>
    )
}


function Choices({ currentPage, count }) {
    if (count <= 0) {
        return <></>
    }

    var pages: number[] = [1]
    const maxPage: number = Math.ceil(count / numPerPage)
    for (let i = -2; i < 3; i++) {
        if (!pages.includes(currentPage + i) && currentPage + i > 0 && currentPage + i <= maxPage) {
            pages.push(currentPage + i)
        }
    }
    if (!pages.includes(maxPage) && maxPage > 0) {
        pages.push(maxPage)
    }

    return (
        <div className={styles.pageNumbers}>
            {pages.map(page => {
                if (Number(page) === Number(currentPage)) {
                    return (
                        <div key={page} className={styles.pageLink}>
                            {page}
                        </div>
                    )
                } else {
                    return (
                        <Link key={page} href={{pathname: '/momentumlist/[page]', query: { page: page }}}>
                            <a className={styles.pageLink}>{page}</a>
                        </Link>
                    )
                }
            })}
        </div>
    )
}