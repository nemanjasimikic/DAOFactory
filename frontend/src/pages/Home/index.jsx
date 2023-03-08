import { useContext } from 'react'
import { WalletContext } from 'context/walletContext'
import IsLoggedOut from 'pages/Home/IsLoggedOut'
import IsLoggedIn from 'pages/Home/IsLoggedIn'
import Table from 'components/common/Table'
import styles from './style.module.sass'
const Home = ({ client }) => {
  const { state: ContextState, login } = useContext(WalletContext)
  const {
    isLoginPending,
    isLoggedIn,
    loginError,
    addressContext,
    balanceContext,
  } = ContextState

  const isLoggedInStore = localStorage?.getItem('isLoggedIn')
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
  return (
    <div className={styles.container}>
      {!isLoggedIn ? (
        <IsLoggedOut />
      ) : !isLoginPending ? (
        isLoggedInStore ? (
          <IsLoggedIn address={addressContext} />
        ) : (
          <IsLoggedOut />
        )
      ) : (
        <Table columns={columns} data={dataTable} />
      )}
    </div>
  )
}

export default Home
