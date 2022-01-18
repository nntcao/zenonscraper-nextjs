import { Pool, PoolClient } from 'pg'

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "root",
    database: "zenon-test",
    port: 5432,
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


