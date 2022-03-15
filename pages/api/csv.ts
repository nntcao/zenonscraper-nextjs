import * as db from '../../services/db'
import { jsonToCsv } from '../../utils/jsoncsv'

async function handler(request, response) {
    const address = request.query?.address

    const accountBlockQueryResult = await db.query(`
        SELECT b.momentumheight AS momentum_height, b.hash AS txn_hash, b.address AS from_address, b.toaddress AS to_address, b.amount / POWER(10, token.decimals) AS amount, token.symbol,
            b.timestamp AS unix_timestamp, TO_TIMESTAMP(b.timestamp) AT TIME ZONE 'UTC' AS utc_timestamp
        FROM (
            SELECT a.hash, a.address, a.toaddress, a.amount, a.tokenstandard, a.usedplasma, momentum.height as momentumheight,
                momentum.timestamp
            FROM (
                    SELECT * FROM accountblock
                    WHERE address = $1 OR toaddress = $1
                ) AS a
            INNER JOIN momentum
            ON momentum.hash = a.momentumhash
            ORDER BY momentum.height DESC, a.hash
        ) AS b
        INNER JOIN token
        ON b.tokenstandard = token.tokenstandard
        WHERE b.amount > 0 AND b.amount IS NOT NULL
        ORDER BY b.momentumheight DESC
    `, [address])
    
    const accountBlockJson = accountBlockQueryResult?.rows
    if (accountBlockJson == null || accountBlockJson?.length == 0) {
        response.status(404).send('No transactions >0 amount found')
    } else {
        const accountBlockJsonTyped = appendTxnType(accountBlockJson, address)
        const accountBlockCsv = jsonToCsv(accountBlockJsonTyped)
        response.setHeader('Content-Type', 'text/csv')
        response.send(accountBlockCsv)    

    }
}

function appendTxnType(accountBlockJson, primary_address) {
    return accountBlockJson.map(row => {
        if (row.from_address === primary_address) {
            if (row.to_address === 'z1qxemdeddedxstakexxxxxxxxxxxxxxxxjv8v62') {
                row.txn_type = 'stake'
            } else {
                row.txn_type = 'send'
            }
        } else {
            if (row.from_address === 'z1qxemdeddedxt0kenxxxxxxxxxxxxxxxxh9amk0') {
                row.txn_type = 'stake_reward'
            } else {
                row.txn_type = 'receive'
            }
        }
        return row
    })
}

export default handler