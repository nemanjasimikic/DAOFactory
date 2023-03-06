import { useContext, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Button from 'components/common/Button'
import { addressFormat } from 'helpers/addressFormat'
import walletLogout from 'static/svg/walletLogout.svg'
import walletAvatar from 'static/svg/walletAvatar.svg'
import { WalletContext } from '../../../context/walletContext'
import styles from './styles.module.sass'

const Navbar = () => {
  const { state: ContextState, login, logout } = useContext(WalletContext)
  const {
    isLoginPending,
    isLoggedIn,
    loginError,
    addressContext,
    balanceContext,
  } = ContextState

  const navigate = useNavigate()

  useEffect(() => {
    const checkWallet = async () => {
      if (localStorage?.getItem('isLoggedIn')) {
        try {
          login()
        } catch (e) {}
      }
    }
    checkWallet()
  }, [])

  return (
    <nav className={styles.navbar}>
      {isLoggedIn ? (
        <NavLink
          to={'/create-dao'}
          className={({ isActive }) =>
            isActive ? styles.active : styles.navLink
          }
        >
          Create new DAO
        </NavLink>
      ) : (
        <p className={styles.navLink}> Create new DAO</p>
      )}
      <NavLink
        to={'/'}
        className={({ isActive }) =>
          isActive ? styles.active : styles.navLink
        }
      >
        My DAOs
      </NavLink>
      {addressContext === '' ||
      (isLoggedIn === false && isLoginPending === false) ? (
        <Button
          text={'Connect wallet'}
          style={'primaryBtn'}
          onClick={async (e) => {
            e.preventDefault()
            login()
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
              navigate('/')
            }}
            alt={'logout'}
          />
        </div>
      )}
    </nav>
  )
}

export default Navbar
