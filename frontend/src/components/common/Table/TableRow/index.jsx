import styles from './styles.module.sass'
import TableRowCell from '../TableRowCell'

const TableRow = ({ data, columns }) => {
  console.log('data: ', data)
  console.log('columns: ', columns)
  return (
    <>
      {data.map((item, itemIndex) => (
        <div className={styles.tableRowItem} key={`tableBody${itemIndex}`}>
          {columns.map((column, columnIndex) => (
            <TableRowCell
              key={`tableRowCell${columnIndex}`}
              item={item}
              column={column}
            />
          ))}
        </div>
      ))}
    </>
  )
}

export default TableRow
