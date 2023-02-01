import styles from './styles.module.sass'
import TableRowCell from '../TableRowCell'

const TableRow = ({ data, columns, isLoading }) => {
  return (
    <>
      {data.map((item, itemIndex) => (
        <div className={styles.tableRowItem} key={`tableBody${itemIndex}`}>
          {columns.map((column, columnIndex) => (
            <TableRowCell
              key={`tableRowCell${columnIndex}`}
              item={item}
              column={column}
              isLoading={isLoading}
            />
          ))}
        </div>
      ))}
    </>
  )
}

export default TableRow
