import styles from './styles.module.sass'

const TableHeader = ({ columns, token }) => {
  return (
    <div className={styles.tableHeader}>
      {columns.map((column, columnIndex) => (
        <div
          key={`tableHeadCell${columnIndex}`}
          style={{ width: column.width }}
        >
          {column.title === 'Amount' && token != null ? column.title + `, ${token}` : column.title}
        </div>
      ))}
    </div>
  )
}

export default TableHeader
