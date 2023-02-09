import RouteBreadcrumbs from 'components/RouteBreadcrumbs'
import ContentHeader from 'components/common/ContentHeader'
import YourAccountCard from 'components/YourAccountCard'
import AccountBalance from 'components/BalanceProposalInfo/AccountBalance'
import NoResults from 'components/NoResults'
import Table from 'components/common/Table'
import { columnsTransactionHistory, dataTransactionHistory } from './mocks'
import styles from './styles.module.sass'
import { useParams } from 'react-router-dom'

const BalanceManagement = () => {
  const { id } = useParams()
  console.log('id: ', id)
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
          <h3 className={styles.contentHeading}>Transaction history</h3>
          {/*<NoResults />*/}
          <Table
            columns={columnsTransactionHistory}
            data={dataTransactionHistory}
          />
        </div>
        <AccountBalance id={id} />
      </div>
    </div>
  )
}

export default BalanceManagement
