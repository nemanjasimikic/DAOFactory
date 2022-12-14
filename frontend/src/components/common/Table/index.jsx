import TableHeader from './TableHeader'
import TableRow from './TableRow'
import styles from './styles.module.sass'

const Table = ({ data, columns }) => {
  return (
    <div className={styles.tableWrapper}>
      <div>
        <TableHeader columns={columns} />
      </div>
      <div>
        <TableRow data={data} columns={columns} />
      </div>
    </div>
  )
}

export default Table
