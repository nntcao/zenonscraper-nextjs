import styles from './Table.module.scss'
import Card from '../Card/Card'
import Subtitle from '../Subtitle/Subtitle'
import TableBody from './TableBody/TableBody'
import TableHeader from './TableHeader/TableHeader'
import TableRow from './TableRow/TableRow'
import TableCell from './TableCell/TableCell'

export default function Table({ title='', fields=[], data=[], children=undefined, header=true }) {
    let tableRowAltStyle = false

    return (
        <Card style={{
            paddingLeft: "0px",
            paddingRight: "0px",
        }}>
            {title &&
                <Subtitle className={styles.title}>{title}</Subtitle>
            }
            <table className={styles.table}>
                {fields && header &&
                    <TableHeader>
                        <TableRow>
                            {fields.map(field => {
                                return (
                                    <TableCell>
                                        {field.label}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHeader>
                }
                {data &&
                    <TableBody>
                        {data.map(item => {
                            return (
                                <TableRow className={tableRowAltStyle ? styles.tableRowAlt : styles.tableRow}>
                                    {fields.map(field => {
                                        tableRowAltStyle = !tableRowAltStyle
                                        return (
                                            <TableCell>
                                                {item[field.value]}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            )
                        })}
                    </TableBody>}
                { children }
            </table>
        </Card>
    )
}