import _ from 'lodash'
import { Link, useLocation } from 'react-router-dom'
import Button from 'components/common/Button'
import daoService from 'store/services/daoService'
import { addressFormat } from 'helpers/addressFormat'
import styles from './styles.module.sass'
import walletAvatar from 'static/svg/walletAvatar.svg'
import { useState } from 'react'
import { useEffect } from 'react'

const TableRowCell = ({
  item,
  column,
  isLoading,
  ownerAddress,
  daoAddress,
}) => {
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
  const votesFor =
    total === 0 || isNaN(total) ? 0 : (item.forVotes / total) * 100
  const votesAgainst = total === 0 || isNaN(total) ? 0 : 100 - votesFor
  const background =
    total === 0 || isNaN(total)
      ? 'rgba(255, 255, 255, 0.08)'
      : `linear-gradient(to right, #4AB44A 0%, #4AB44A ${votesFor}%, #EB4361 ${votesFor}%, #EB4361 100%)`
  const actionIn =
    item.actionInMS < 0
      ? 'Action executed'
      : isNaN(item.actionInMS)
      ? 'Action date unknown'
      : `Action in ${item.actionInDays} days`

  const actionBefore = daoService.parseMillisecondsIntoReadableTime(
    item.dateStaking
  )

  const [isActive, setActive] = useState(false)

  async function canUnlock(proposalId) {
    try {
      const unlock = await daoService.canUnlockVotes(
        daoAddress,
        proposalId,
        ownerAddress
      )
      //  console.log('unlock: ', unlock)
      //console.log('proposalId: ', proposalId)
      setActive(unlock)
    } catch (e) {
      console.log(e)
      setActive(false)
    }
  }

  //console.log(column.key)
  useEffect(() => {
    const checkWallet = async () => {
      if (column.key === 'unlockTokens') {
        try {
          canUnlock(item.id)
        } catch (e) {
          console.log(e)
        }
      }
    }
    checkWallet()
  }, [])
  //console.log('item: ', item)
  //console.log('isActive: ', isActive)

  return (
    <div style={{ width: column.width }}>
      {column.key === 'voting' ? (
        <div className={styles.rangeWrapper}>
          <div className={styles.percentageRow}>
            <p className={styles.yes}>{Math.round(votesFor)}%</p>
            <p className={styles.no}>{Math.round(votesAgainst)}%</p>
          </div>
          <div className={styles.line} style={{ background: background }} />
        </div>
      ) : column.key === 'date' ? (
        <div className={styles.dateWrapper}>
          <p className={styles.action}>{actionIn}</p>
          <p className={styles.date}>{item.endTime}</p>
        </div>
      ) : column.key === 'dateStaking' ? (
        <div className={styles.dateWrapper}>
          <p className={styles.action}>{actionBefore}</p>
        </div>
      ) : column.key === 'unlockTokens' ? (
        <Button
          style={isActive ? 'primaryBtn' : 'disabledBtn'}
          text={'Unlock'}
          disabled={!isActive}
          onClick={async (e) => {
            // console.log('deployedActions: ', deployedActions)
            await daoService
              .unlockVotes(daoAddress, item.id, ownerAddress)
              .catch((e) => {
                return
              })
          }}
        />
      ) : column.key === 'myvote' ? (
        item.forVotes > 0 ? (
          <div className={styles.rangeWrapper}>
            <div className={styles.dateWrapper}>
              <p className={styles.action}>For</p>
              <p className={styles.date}>{item.forVotes /*item.myVote*/}</p>
            </div>
          </div>
        ) : item.againstVotes > 0 ? (
          <div className={styles.rangeWrapper}>
            <div className={styles.dateWrapper}>
              <p className={styles.action}>Against</p>
              <p className={styles.date}>{item.againstVotes /*item.myVote*/}</p>
            </div>
          </div>
        ) : (
          <div className={styles.rangeWrapper}>
            <div className={styles.dateWrapper}>
              <p className={styles.action}>-</p>
              <p className={styles.date}>{'-' /*item.myVote*/}</p>
            </div>
          </div>
        )
      ) : column.key === 'addresses' ? (
        <div className={styles.addressWrapper}>
          <img src={walletAvatar} alt={'address'} />
          <p className={styles.address}>{addressFormat(item.userAddress)}</p>
        </div>
      ) : column.key === 'amount' ? (
        <p className={value < 0 ? styles.negative : styles.positive}>
          {item.amount}
        </p>
      ) : column.key === 'summary' ? (
        <Link
          to={`proposal/${item.id}` /*`/dao/${item.slug}/proposal/${item.id}`*/}
        >
          <p className={styles.tableCell}>{item.summary}</p>
        </Link>
      ) : column.key === 'voter' ? (
        <div className={styles.addressWrapper}>
          <p className={styles.address}>{addressFormat(item.voter)}</p>
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
