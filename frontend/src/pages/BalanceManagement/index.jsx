import RouteBreadcrumbs from 'components/RouteBreadcrumbs'
import ContentHeader from 'components/common/ContentHeader'
import YourAccountCard from 'components/YourAccountCard'
import AccountBalance from 'components/AccountBalance'
import styles from './styles.module.sass'

const BalanceManagement = () => {
  return (
    <div className={styles.container}>
      <RouteBreadcrumbs text={'Your account'} />
      <ContentHeader title={'Your account'} />
      <div className={styles.balanceManagement}>
        <div className={styles.balanceContent}>
          <div className={styles.cardRow}>
            <YourAccountCard text={'Your voting weight'} />
            <YourAccountCard text={'Your $TOKEN_TICKET locked'} />
          </div>
        </div>
        <AccountBalance />
      </div>
    </div>
  )
}

export default BalanceManagement
