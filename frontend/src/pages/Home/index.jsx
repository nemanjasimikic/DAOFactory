import IsLoggedOut from 'pages/Home/IsLoggedOut'
import IsLoggedIn from 'pages/Home/IsLoggedIn'

import styles from './style.module.sass'
import { useEffect, useContext } from 'react'
import { WalletContext } from 'context/walletContext'
import { useQuery } from 'react-query'
import walletService from 'store/services/walletService'

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
  /* const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  })*/
  const { data, error, isError, isLoading } = useQuery(
    'user',
    walletService.isLoggedIn
  )

  console.log('data query: ', data)

  return (
    <div className={styles.container}>
      {
        data ? <IsLoggedIn address={data} /> : <IsLoggedOut />
        /*isLoggedIn === false ? <IsLoggedOut /> : <IsLoggedIn address={addressContext}/>*/
      }
    </div>
  )
}

export default Home
