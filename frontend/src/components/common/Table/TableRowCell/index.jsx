import _ from 'lodash'
import styles from './styles.module.sass'
import { useLocation } from 'react-router-dom'
import Button from '../../Button'
import walletAvatar from 'static/svg/walletAvatar.svg'
import { addressFormat } from '../../../../helpers/addressFormat'

const TableRowCell = ({ item, column, isLoading }) => {
  const value = _.get(item, column.key)
  const location = useLocation()

  const className =
    item.status === 'Active' || item.status === 'Pending'
      ? styles.darkBlueActive
      : item.status === 'Canceled'
      ? styles.darkBlueInactive
      : item.status === 'Failed' || item.status === 'Expired'
      ? styles.red
      : item.status === 'Succeeded' || item.status === 'Queued'
      ? styles.yellow
      : styles.green

  return (
    <div style={{ width: column.width }}>
      {column.key === 'voting' ? (
        <div className={styles.rangeWrapper}>
          <div className={styles.percentageRow}>
            <p className={styles.yes}>20%</p>
            <p className={styles.no}>80%</p>
          </div>
          <div className={styles.line}></div>
        </div>
      ) : column.key === 'date' ? (
        <div className={styles.dateWrapper}>
          <p className={styles.action}>Action in 22 days</p>
          <p className={styles.date}>Jun 07, 2021, 17:22</p>
        </div>
      ) : column.key === 'unlockTokens' ? (
        <Button style={'primaryBtn'} text={'Unlock'} />
      ) : column.key === 'myvote' ? (
        <div className={styles.rangeWrapper}>
          <div className={styles.dateWrapper}>
            <p className={styles.action}>For</p>
            <p className={styles.date}>123 000.72</p>
          </div>
        </div>
      ) : column.key === 'addresses' ? (
        <div className={styles.addressWrapper}>
          <img src={walletAvatar} alt={'address'} />
          <p className={styles.address}>{addressFormat(item.userAddress)}</p>
        </div>
      ) : (
        <p
          className={
            location.pathname === '/' || isLoading
              ? styles.tableCellLoading
              : styles.tableCell
          }
        >
          <span className={column.key === 'status' ? className : ''}>
            {column.render ? column.render(column, item) : value}
          </span>
        </p>
      )}
    </div>
  )
}

export default TableRowCell
