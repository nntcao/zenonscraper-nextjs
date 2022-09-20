import * as db from '../services/DatabaseService'

export async function getData() {
    const accountBlockQueryResult = await db.query(`
        SELECT accountblock.hash, momentum.timestamp, accountblock.address, accountblock.toaddress, accountblock.amount, token.symbol, token.decimals
        FROM accountblock
        INNER JOIN momentum 
        ON accountblock.momentumhash = momentum.hash
        INNER JOIN token
        ON accountblock.tokenstandard = token.tokenstandard
        ORDER BY momentum.timestamp DESC, accountblock.hash
        LIMIT 10
    `)
    return accountBlockQueryResult?.rows
}
