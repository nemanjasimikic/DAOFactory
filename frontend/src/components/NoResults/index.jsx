import { useLocation } from 'react-router-dom'
import Button from 'components/common/Button'

import styles from './styles.module.sass'
const renderNoDao = () => {
  return (
    <div className={styles.noResultsContainer}>
      <h3>It seems you haven't made any dao yet</h3>
      <p>Create your first DAO or add existing one.</p>
    </div>
  )
}
const renderLoggedOutBalance = () => {
  return (
    <div className={styles.noResultsContainer}>
      <h3>Connect EVER Wallet Extension </h3>
      <p>It is necessary to access your veQUBE balance</p>
      <Button type={'lightBlueBtn'} text={'Connect EVER Wallet'} />
    </div>
  )
}
const NoResults = () => {
  const location = useLocation()
  return (
    <div className={styles.render}>
      {location.pathname === '/'
        ? renderNoDao()
        : renderLoggedOutBalance()}
    </div>
  )
}

export default NoResults
