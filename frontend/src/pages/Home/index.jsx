import IsLoggedOut from 'pages/Home/IsLoggedOut'
import IsLoggedIn from 'pages/Home/IsLoggedIn'

import styles from './style.module.sass'
import { useContext } from 'react'
import { WalletContext } from 'context/walletContext'

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
  return (
    <div className={styles.container}>
      {!isLoginPending ? (
        isLoggedInStore ? (
          <IsLoggedIn address={addressContext} />
        ) : (
          <IsLoggedOut />
        )
      ) : null}
    </div>
  )
}

export default Home
