
export function jsonToCsv(rows) {
    const header = Object.keys(rows[0])
    const replacer = (key, value) => value === null ? '' : value
    const csv = [
        header.join(','),
        ...rows.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    ].join('\r\n')

    return csv
}

