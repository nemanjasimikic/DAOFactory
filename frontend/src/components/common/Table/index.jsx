import TableHeader from './TableHeader'
import TableRow from './TableRow'
import styles from './styles.module.sass'

const Table = ({ data, columns, isLoading }) => {
  console.log('table data: ', data)
  return data ? (
    <div className={styles.tableWrapper}>
      <div>
        <TableHeader columns={columns} />
      </div>
      <div>
        <TableRow data={data} columns={columns} isLoading={isLoading} />
      </div>
    </div>
  ) : (
    <div className={styles.tableWrapper}>
      <div>
        <TableHeader columns={columns} />
      </div>
      <div> </div>
    </div>
  )
}

export default Table
