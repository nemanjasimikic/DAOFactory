import _ from 'lodash'
import styles from './styles.module.sass'

const TableRowCell = ({ item, column }) => {
  const value = _.get(item, column.key)

  return (
    <div className={styles.tableCell} style={{ width: column.width }}>
      {column.render ? column.render(column, item) : value}
    </div>
  )
}

export default TableRowCell
