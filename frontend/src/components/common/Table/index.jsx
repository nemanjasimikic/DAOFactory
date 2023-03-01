import TableHeader from './TableHeader'
import TableRow from './TableRow'
import styles from './styles.module.sass'

const Table = ({ data, columns, isLoading, ownerAddress, daoAddress, token }) => {
  return data ? (
    <div className={styles.tableWrapper}>
      <div>
        <TableHeader columns={columns} token={token ? token : null} />
      </div>
      <div>
        <TableRow
          data={data}
          columns={columns}
          isLoading={isLoading}
          ownerAddress={ownerAddress}
          daoAddress={daoAddress}
        />
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
