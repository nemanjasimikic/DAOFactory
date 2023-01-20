import _ from 'lodash'
import styles from './styles.module.sass'
import { useLocation } from 'react-router-dom'
import Button from '../../Button'
import walletAvatar from 'static/svg/walletAvatar.svg'
import { addressFormat } from '../../../../helpers/addressFormat'

const TableRowCell = ({ item, column }) => {
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

  const total = item.forVotes + item.againstVotes
  const votesFor = (item.forVotes / total) * 100
  // if total is 0, make it 0 as it would be a 100 othewise
  const votesAgainst = total === 0 ? 0 : 100 - votesFor
  // voting percentage line style
  let background = 
    total === 0 ? 'rgba(255, 255, 255, 0.08)' : `linear-gradient(to right, #4AB44A 0%, #4AB44A ${votesFor}%, #EB4361 ${votesFor}%, #EB4361 100%)`
  // to check the var below
  const actionIn = item.actionInMS < 0 ? 'Action executed' : `Action in ${item.actionInDays} days`

  return (
    <div style={{ width: column.width }}>
      {column.key === 'voting' ? (
        <div className={styles.rangeWrapper}>
          <div className={styles.percentageRow}>
            <p className={styles.yes}>{Math.round(votesFor)}%</p>
            <p className={styles.no}>{Math.round(votesAgainst)}%</p>
          </div>
          <div className={styles.line}
            style={{background: 
              background
            }}
          ></div>
        </div>
      ) : column.key === 'date' ? (
        <div className={styles.dateWrapper}>
          <p className={styles.action}>{actionIn}</p>
          <p className={styles.date}>{item.queuedTime}</p>
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
          <p className={styles.address}>
            {addressFormat(
              '0:ce752d9d8fea9be1d760dd2ee2bb3b2d8d1c6459fdaf61561277672c84db11f2'
            )}
          </p>
        </div>
      ) : (
        <p
          className={
            location.pathname === '/'
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
