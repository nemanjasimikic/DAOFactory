import RouteBreadcrumbs from 'components/RouteBreadcrumbs'
import ContentHeader from 'components/common/ContentHeader'
import YourAccountCard from 'components/YourAccountCard'
import AccountBalance from 'components/BalanceProposalInfo/AccountBalance'
import NoResults from 'components/NoResults'
import Table from 'components/common/Table'
import { columnsTransactionHistory, dataTransactionHistory } from './mocks'
import styles from './styles.module.sass'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import daoService from 'store/services/daoService'
import { WalletContext } from 'context/walletContext'
import { useQuery } from 'react-query'

const BalanceManagement = () => {
  const { id } = useParams()
  console.log('id: ', id)
  const { state: ContextState } = useContext(WalletContext)
  const { addressContext } = ContextState
  const { data } = useQuery(
    ['daoRoot', id],
    () => daoService.getDaoInfo(id, addressContext),
    {
      enabled: !!addressContext,
    }
  )

  const columns = [
    {
      key: 'id',
      title: '#',
      width: 100,
    },
    {
      key: 'dao',
      title: 'DAO',
      width: 400,
    },
    {
      key: 'members',
      title: 'Members',
      width: 400,
    },
    {
      key: 'address',
      title: 'Address',
      width: 400,
    },
  ]

  const dataTable = [
    {
      id: '1',
      dao: 'dao1',
      members: 'members1',
      address: 'address1',
    },
    {
      id: '2',
      dao: 'dao2',
      members: 'members2',
      address: 'address2',
    },
    {
      id: '3',
      dao: 'dao3',
      members: 'members3',
      address: 'address3',
    },
    {
      id: '4',
      dao: 'dao4',
      members: 'members4',
      address: 'address4',
    },
  ]
  return data ? (
    <div className={styles.container}>
      <RouteBreadcrumbs text={'Your account'} daoName={data.name} />
      <ContentHeader title={'Your account'} />
      <div className={styles.balanceManagement}>
        <div className={styles.balanceContent}>
          <div className={styles.cardRow}>
            <YourAccountCard
              text={'Your voting weight'}
              data={
                data.daoBalance /*proposalsWithLockedTokens[0].lockedTokens*/
              }
              symbol={data.token}
            />
            <YourAccountCard
              text={`Your ${data.token.value0} locked`}
              data={
                data.daoBalance /*proposalsWithLockedTokens[0].lockedTokens*/
              }
              symbol={data.token}
            />
          </div>
          <h3 className={styles.contentHeading}>Transaction history</h3>
          {/*<NoResults />*/}
          <Table
            columns={columnsTransactionHistory}
            data={dataTransactionHistory}
          />
        </div>
        <AccountBalance id={id} data={data} address={addressContext} />
      </div>
    </div>
  ) : (
    <Table columns={columns} data={dataTable} isLoading={true} />
  )
}

export default BalanceManagement
