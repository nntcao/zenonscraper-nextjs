import * as db from '../../services/db'

const baseURL = "localhost:3000"

export default async function handler(req, res) {
    let suggestions = []
    const query: string = String(req.query.query).toLowerCase()

    if (query === '') {
        return res.status(200).json(suggestions)
    }

    try {
        const possibilities = await Promise.all([getPossibleTokens(query), getPossibleAddresses(query), getPossibleTxns(query), getPossibleMomentums(query)])
        const possibilitiesIndex = [0, 0, 0, 0]
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 4; j++) {
                if (possibilities[j]?.length > 0 && possibilitiesIndex[j] < possibilities[j].length) {
                    suggestions.push(possibilities[j][possibilitiesIndex[j]])
                }
                possibilitiesIndex[j] += 1
                if (suggestions.length >= 7) {
                    break
                }
            }
            if (suggestions.length >= 7) {
                break
            }
        }
        suggestions.sort((a, b) => {
            if (a.type > b.type) return 1
            if (a.type < b.type) return -1
            return 0
        })
        res.status(200).json(suggestions)
    } catch (error) {
        console.log(error)
    }
}

async function getPossibleTokens(query) {
    const possibleTokens = []
    const tokenSymbolQuery = await db.query(`
        SELECT symbol FROM token
        WHERE symbol LIKE $1
        LIMIT 7
    `, [`${query.toUpperCase()}%`])

    const tokenStandardQuery = await db.query(`
        SELECT tokenstandard FROM token
        WHERE tokenstandard LIKE $1
        LIMIT 7
    `, [`${query}%`])

    possibleTokens.push(...tokenSymbolQuery?.rows.map(queryResult => {
        return {
            val: queryResult.symbol,
            type: "Token",
            url: `/token/${queryResult.symbol}`,
        }
    }))

    possibleTokens.push(...tokenStandardQuery?.rows.map(queryResult => {
        return {
            val: queryResult.tokenstandard,
            type: "Token",
            url: `/token/${queryResult.tokenstandard}`,
        }
    }))
    return possibleTokens
}

async function getPossibleAddresses(query) {
    const possibleAddresses = []
    const addressQuery = await db.query(`
        SELECT address FROM address
        WHERE address LIKE $1
        LIMIT 7
    `, [`${query}%`])

    possibleAddresses.push(...addressQuery?.rows.map(queryResult => {
        return {
            val: queryResult.address,
            type: "Address",
            url: `/address/${queryResult.address}`,
        }
    }))

    if (possibleAddresses.length === 0) {
        if (query.substring(0, 3) === 'z1q' && query.length === 40) {
            possibleAddresses.push({
                val: query,
                type: "Address",
                url: `/address/${query}`,
            })
        }    
    }

    return possibleAddresses
}

async function getPossibleTxns(query) {
    const possibleTxns = []
    const txnQuery = await db.query(`
        SELECT hash FROM accountblock
        WHERE hash LIKE $1
        LIMIT 7
    `, [`${query}%`])

    const splitQuery: string[] = query.split(' ')
      if (splitQuery.length > 1) {    
        if (!isNaN(Number(splitQuery[1]))) {
            const txnQueryAddress = await db.query(`
                SELECT address, height, hash FROM accountblock
                WHERE height = $2 AND address = $1
            `, [splitQuery[0], Number(splitQuery[1])])

            if (txnQueryAddress?.rows[0]) {
                possibleTxns.push({
                    val: `${txnQueryAddress.rows[0]?.address} ${txnQueryAddress.rows[0]?.height}`,
                    type: "Transaction",
                    url: `/accountblock/${txnQueryAddress.rows[0]?.hash}`
                })
            }

        }
    }

    possibleTxns.push(...txnQuery?.rows.map(queryResult => {
        return {
            val: queryResult.hash,
            type: "Transaction",
            url: `/accountblock/${queryResult.hash}`,
        }
    }))

    return possibleTxns
}

async function getPossibleMomentums(query) {
    const possibleMomentums = []
    const queryNumber: number = isNaN(Number(query)) ? -1 : Number(query)
    const momentumHeightQuery = await db.query(`
        SELECT height FROM momentum
        WHERE height = $1
        LIMIT 1
    `, [queryNumber])

    const momentumHashQuery = await db.query(`
        SELECT hash FROM momentum
        WHERE hash LIKE $1
        LIMIT 7
    `, [`${query}%`])

    possibleMomentums.push(...momentumHeightQuery?.rows.map(queryResult => {
        return {
            val: queryResult.height,
            type: "Momentum",
            url: `/momentum/${queryResult.height}`,
        }
    }))

    possibleMomentums.push(...momentumHashQuery?.rows.map(queryResult => {
        return {
            val: queryResult.hash,
            type: "Momentum",
            url: `/momentum/${queryResult.hash}`,
        }
    }))
    return possibleMomentums
}