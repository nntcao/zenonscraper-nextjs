import { Pool, PoolClient } from 'pg'

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT)
})

interface IClientHandler {
    (client: PoolClient): any
}

export async function query(text: string, params?: any[]) {
    try {
        if (typeof params === 'undefined') {
            return await pool.query(text)
        } else {
            return await pool.query(text, params)
        }
    } catch(e) {
        console.log(e)
    }
}

export async function checkoutClient(clientHandler: IClientHandler) {
    var client: PoolClient = await pool.connect()
    try {
        var response: any = await clientHandler(client)
    } finally {
        client.release()
        return response
    }
}


