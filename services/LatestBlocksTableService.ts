
import * as db from '../services/DatabaseService'

export async function getData() {
    const momentumQueryResult = await db.query(`
        SELECT momentum.height, momentum.hash, momentum.timestamp, momentum.producer, a.countblocks 
        FROM (SELECT m.hash, COUNT(accountblock.hash) AS countblocks FROM
        (SELECT momentum.hash
        FROM momentum
        ORDER BY height DESC
        LIMIT 10) AS m
        LEFT OUTER JOIN accountblock
        ON m.hash = accountblock.momentumhash
        GROUP BY m.hash) as a
        INNER JOIN momentum 
        ON a.hash = momentum.hash
        ORDER BY momentum.height DESC
    `)
    return momentumQueryResult?.rows
}
