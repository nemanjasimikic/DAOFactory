import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout, reset } from 'store/features/walletSlice'
import Button from 'components/common/Button'
import { addressFormat } from 'helpers/addressFormat'
import styles from './styles.module.sass'
import walletLogout from 'static/svg/walletLogout.svg'
import walletAvatar from 'static/svg/walletAvatar.svg'

const Navbar = () => {
  const dispatch = useDispatch()

  const wallet = useSelector((state) => state.wallet)
  console.log('State wallet: ', wallet)
  useEffect(() => {
    dispatch(reset())
  }, [wallet, dispatch])
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
      {wallet.wallet === null ? (
        <Button
          text={'Connect wallet'}
          type={'primaryBtn'}
          onClick={() => dispatch(login())}
        />
      ) : (
        <div className={styles.walletInfoWrapper}>
          <img src={walletAvatar} alt={'avatar'} />
          <div className={styles.walletBalanceCol}>
            <p className={styles.address}>{addressFormat(wallet.wallet)}</p>
            <p className={styles.balance}>{wallet.balance}</p>
          </div>
          <img
            className={styles.logout}
            src={walletLogout}
            onClick={() => dispatch(logout())}
            alt={'logout'}
          />
        </div>
      )}
    </nav>
  )
}

export default Navbar
