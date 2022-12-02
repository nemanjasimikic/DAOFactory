import styles from './styles.module.sass'

const TableHeader = ({ columns }) => {
  return (
    <div className={styles.tableHeader}>
      {columns.map((column, columnIndex) => (
        <div
          key={`tableHeadCell${columnIndex}`}
          style={{ width: column.width }}
        >
          {column.title}
        </div>
      ))}
    </div>
  )
}

export default TableHeader
