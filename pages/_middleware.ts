import { NextResponse, NextRequest } from 'next/server'
import * as db from '../services/db'

export async function middleware(req, ev) {
    const { pathname } = req.nextUrl
    if (String(pathname).match(/\/search\/*/)) {
        const searchQuery = String(pathname).substring(0,8)

        if ((await checkExistsInDatabase('momentum', 'height', searchQuery)) || (await checkExistsInDatabase('momentum', 'hash', searchQuery))) {
            return NextResponse.redirect(`/momentum/${searchQuery}`)
        } else if (await checkExistsInDatabase('accountblock', 'hash', searchQuery)) {
            return NextResponse.redirect(`/accountblock/${searchQuery}`)
        } else if (await checkExistsInDatabase('token', 'tokenstandard', searchQuery) || (await checkExistsInDatabase('token', 'symbol', searchQuery))) {
            return NextResponse.redirect(`/token/${searchQuery}`)
        } else if (await checkExistsInDatabase('address', 'address', searchQuery)) {
            return NextResponse.redirect(`/address/${searchQuery}`)
        } else {
            return NextResponse.redirect(`/404.tsx`)
        }
    }
    return NextResponse.next()
}

async function checkExistsInDatabase(table, variable, value) {
    const checkValue = await db.query(`
        SELECT 1 FROM ${table} WHERE ${variable} = $1
    `, [value])
    return checkValue?.rows[0] ?? null
}