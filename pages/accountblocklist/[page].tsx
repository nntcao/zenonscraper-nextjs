import * as db from '../../services/db'
import Layout from '../../components/Layout'
import styles from './AccountBlockList.module.scss'
import AccountBlockTable from '../../components/AccountBlockTable'
import SearchBar from '../../components/Searchbar'
import Link from 'next/link'

const numPerPage = 25

export async function getServerSideProps(context) {
    context.res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )

    const page: number = Number(context.params.page)
    
    const accountBlockQuery = await db.query(`
        SELECT accountblock.hash, momentum.height as momentumheight, momentum.timestamp, accountblock.address, accountblock.toaddress, 
            accountblock.amount, token.symbol, token.decimals, accountblock.usedplasma
            FROM accountblock
            INNER JOIN momentum 
            ON accountblock.momentumhash = momentum.hash
            INNER JOIN token
            ON accountblock.tokenstandard = token.tokenstandard
            ORDER BY momentum.timestamp DESC, accountblock.hash
        OFFSET $2
        LIMIT $1
    `, [numPerPage, (page - 1) * numPerPage])

    const accountBlockCountQuery = await db.query(`
        SELECT COUNT(hash) as countblocks FROM accountblock
    `)
    
    return { 
        props: {
            accountBlocks: accountBlockQuery?.rows ?? null,
            page: page ?? null,
            accountBlockCount: accountBlockCountQuery?.rows[0]?.countblocks ?? null
        }
    }
}


export default function AccountBlockList({ accountBlocks, page, accountBlockCount }) {
    return (
        <Layout>
            <div className={styles.main}>
                <SearchBar />
                <h2 className={styles.tableTitle}>Account Blocks</h2>
                <h2 className={styles.tableTitle}>Page {page}</h2>
                <AccountBlockTable accountBlocks={accountBlocks}/>
                <Choices currentPage={page} count={accountBlockCount}/>
            </div>
        </Layout>
    )
}


function Choices({ currentPage, count }) {
    if (count <= 0) {
        return <></>
    }

    console.log(currentPage);
    
    if (currentPage > 3) {
        var pages = [1, currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2, count]
    } else if (currentPage === 3) {
        var pages = [1, 2, 3, 4, 5, count]
    } else {
        var pages = [1, 2, 3, 4, 5, count]
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
                        <Link key={page} href={{pathname: '/accountblocklist/[page]', query: { page: page }}}>
                            <a className={styles.pageLink}>{page}</a>
                        </Link>
                    )
                }
            })}
        </div>
    )
}