import IsLoggedOut from 'pages/Home/IsLoggedOut'
import IsLoggedIn from 'pages/Home/IsLoggedIn'

import styles from './style.module.sass'
import { useEffect, useContext } from 'react'
import { WalletContext } from 'context/walletContext'
import { useQuery, QueryClient } from 'react-query'
import walletService from 'store/services/walletService'

const Home = ({ client }) => {
  // const wallet = useSelector((state) => state.wallet)
  // useEffect(() => {
  //   reset()
  // }, [wallet])
  const { state: ContextState, login } = useContext(WalletContext)
  const {
    isLoginPending,
    isLoggedIn,
    loginError,
    addressContext,
    balanceContext,
  } = ContextState
  console.log('isLoggedIn: ', isLoggedIn)

  const data = useQuery('user', { refetchOnReconnect: true }) //client.getQueryData('user')
  console.log('data: ', data)
  return (
    <div className={styles.container}>
      {
        isLoggedIn ? <IsLoggedIn address={addressContext} /> : <IsLoggedOut />
        /*isLoggedIn === false ? <IsLoggedOut /> : <IsLoggedIn address={addressContext}/>*/
      }
    </div>
  )
}

export default Home
