import * as db from '../../services/db'

const baseURL = "localhost:3000"

export default async function handler(req, res) {
    let suggestions = []
    const query: string = String(req.query.query)
    const queryNumber: number = isNaN(Number(query)) ? -1 : Number(query)

    if (query === '') {
        return res.status(200).json(suggestions)
    }

    try {
        const momentumHeightQuery = await db.query(`
            SELECT height FROM momentum
            WHERE height = $1
            LIMIT 1
        `, [queryNumber])

        const tokenSymbolQuery = await db.query(`
            SELECT symbol FROM token
            WHERE symbol LIKE $1
            LIMIT 1
        `, [`${query.toUpperCase()}%`])

        const addressQuery = await db.query(`
            SELECT address FROM address
            WHERE address LIKE $1
            LIMIT 7
        `, [`${query}%`])

        const txnQuery = await db.query(`
            SELECT hash FROM accountblock
            WHERE hash LIKE $1
            LIMIT 7
        `, [`${query}%`])

        const momentumHashQuery = await db.query(`
            SELECT hash FROM momentum
            WHERE hash LIKE $1
            LIMIT 7
        `, [`${query}%`])

        const tokenStandardQuery = await db.query(`
            SELECT tokenstandard FROM token
            WHERE tokenstandard LIKE $1
            LIMIT 1
        `, [`${query.toUpperCase()}%`])

        suggestions.push(...addressQuery?.rows.map(queryResult => {
            return {
                val: queryResult.address,
                type: "Address",
                url: `/address/${queryResult.address}`,
            }
        }))
        res.status(200).json(suggestions)
    } catch (error) {
        console.log(error);
        
    }


}