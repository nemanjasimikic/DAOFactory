import IsLoggedOut from 'pages/Home/IsLoggedOut'
import IsLoggedIn from 'pages/Home/IsLoggedIn'

import styles from './style.module.sass'
import { useEffect, useContext } from 'react'
import { WalletContext } from 'context/walletProvider'

const Home = () => {
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
  return (
    <div className={styles.container}>
      {isLoggedIn === false ? <IsLoggedOut /> : <IsLoggedIn />}
    </div>
  )
}

export default Home
