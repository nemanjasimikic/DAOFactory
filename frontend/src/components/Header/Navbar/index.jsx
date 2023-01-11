import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import Button from 'components/common/Button'
import { addressFormat } from 'helpers/addressFormat'
import styles from './styles.module.sass'
import walletLogout from 'static/svg/walletLogout.svg'
import walletAvatar from 'static/svg/walletAvatar.svg'
import { WalletContext } from '../../../context/walletContext'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import walletService from 'store/services/walletService'

const Navbar = () => {
  const { state: ContextState, login, logout } = useContext(WalletContext)
  const {
    isLoginPending,
    isLoggedIn,
    loginError,
    addressContext,
    balanceContext,
  } = ContextState
  console.log('state: ', ContextState)
  const { status, data, error, refetch } = useQuery(
    'user',
    walletService.isLoggedIn,
    {
      enabled: false,
    }
  )

  useEffect(() => {
    const checkWallet = async () => {
      if (localStorage?.getItem('isLoggedIn')) {
        console.log('usao')
        try {
          login()
        } catch (e) {
          console.log(e)
        }
      }
    }
    checkWallet()
  }, [])

  return (
    <nav className={styles.navbar}>
      <NavLink
        to={'/create-dao'}
        className={({ isActive }) =>
          isActive ? styles.active : styles.navLink
        }
      >
        Create new DAO
      </NavLink>
      <NavLink
        to={'/'}
        className={({ isActive }) =>
          isActive ? styles.active : styles.navLink
        }
      >
        My DAOs
      </NavLink>
      {isLoggedIn === false ? (
        <Button
          text={'Connect wallet'}
          style={'primaryBtn'}
          onClick={async (e) => {
            e.preventDefault()
            login()
            console.log('state: ', addressContext)
          }}
        />
      ) : (
        <div className={styles.walletInfoWrapper}>
          <img src={walletAvatar} alt={'avatar'} />
          <div className={styles.walletBalanceCol}>
            <p className={styles.address}>{addressFormat(addressContext)}</p>
            <p className={styles.balance}>{balanceContext}</p>
          </div>
          <img
            className={styles.logout}
            src={walletLogout}
            onClick={async (e) => {
              e.preventDefault()
              logout()
              console.log('state: ', addressContext)
            }}
            alt={'logout'}
          />
        </div>
      )}
    </nav>
  )
}

export default Navbar
