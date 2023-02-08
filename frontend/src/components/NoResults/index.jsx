import { useLocation } from 'react-router-dom'
import Button from 'components/common/Button'
import warningIcon from 'static/svg/warningIcon.svg'

import styles from './styles.module.sass'
const renderNoDao = () => {
  return (
    <div className={styles.noResultsContainer}>
      <h3>It seems you haven't made any dao yet</h3>
      <p>Create your first DAO or add existing one.</p>
    </div>
  )
}
// const renderLoggedOutBalance = () => {
//   return (
//     <div className={styles.noResultsContainer}>
//       <h3>Connect EVER Wallet Extension </h3>
//       <p>It is necessary to access your veQUBE balance</p>
//       <Button style={'lightBlueBtn'} text={'Connect EVER Wallet'} />
//     </div>
//   )
// }

const renderInsufficientStake = () => {
  return (
    <div className={styles.noResultsContainer}>
      <img src={warningIcon} alt={'warningIcon'} />
      <h2>Insufficient stake</h2>
      <p>
        Your current stake is not big enough to create a <br />
        proposal. Please increase you stake to at lease <br />
        100 000 EVER tokens.
      </p>
      <Button style={'lightBlueBtn'} text={'Increase stake'} />
    </div>
  )
}

const renderEmptyTransactionList = () => {
  return (
    <div className={styles.noResultsContainer}>
      <h3>Transaction list is empty</h3>
      <p>
        There will be shown all transactions related with your account balance
      </p>
    </div>
  )
}

const NoResults = () => {
  const location = useLocation()
  return (
    <div className={styles.render}>
      {location.pathname === '/'
        ? renderNoDao()
        : location.pathname === 'create-proposal'
        ? renderInsufficientStake()
        : renderEmptyTransactionList()}
    </div>
  )
}

export default NoResults
