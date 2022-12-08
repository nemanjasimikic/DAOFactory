import { useSelector } from 'react-redux'
import IsLoggedOut from 'pages/Home/IsLoggedOut'
import IsLoggedIn from 'pages/Home/IsLoggedIn'

import styles from './style.module.sass'
import { useEffect } from 'react'
import { reset } from 'store/features/walletSlice'

const Home = () => {
  const wallet = useSelector((state) => state.wallet)
  useEffect(() => {
    reset()
  }, [wallet])
  return (
    <div className={styles.container}>
      {wallet.wallet === null ? <IsLoggedOut /> : <IsLoggedIn />}
    </div>
  )
}

export default Home
