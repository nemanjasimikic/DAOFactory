import styles from './styles.module.sass'
import TableRowCell from '../TableRowCell'
import { Link } from 'react-router-dom'
const TableRow = ({ data, columns, isLoading }) => {
  return (
    <>
      {data.map((item, itemIndex) => (
        <Link to={`/proposal/${item.id}`}>
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
        </Link>
      ))}
    </>
  )
}

export default TableRow
