import styles from './Table.module.scss'
import Card from '../Card/Card'
import Subtitle from '../Subtitle/Subtitle'
import TableBody from './TableBody/TableBody'
import TableHeader from './TableHeader/TableHeader'
import TableRow from './TableRow/TableRow'
import TableCell from './TableCell/TableCell'

export default function Table({ title={}, fields=[], data=[], children=undefined, header=true, classNameCell={} }) {
    let tableRowAltStyle = false
    let counter = 0;

    return (
        <div className={styles.tableWithChildren}>
            {title}
            <table className={styles.table}>
                {fields && header &&
                    <TableHeader>
                        <TableRow className={styles.tableRowAlt}>
                            {fields.map(field => {
                                return (
                                    <TableCell key={field.label} className={classNameCell}>
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
                            counter += 1
                            return (
                                <TableRow key={counter} className={tableRowAltStyle ? styles.tableRowAlt : styles.tableRow}>
                                    {fields.map(field => {
                                        tableRowAltStyle = !tableRowAltStyle
                                        return (
                                            <TableCell key={field.label}>
                                                {item[field.value]}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            )
                        })}
                    </TableBody>}
            </table>
            { children }
        </div>
    )
}