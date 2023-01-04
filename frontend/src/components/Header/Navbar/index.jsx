import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import Button from 'components/common/Button'
import { addressFormat } from 'helpers/addressFormat'
import styles from './styles.module.sass'
import walletLogout from 'static/svg/walletLogout.svg'
import walletAvatar from 'static/svg/walletAvatar.svg'
import WalletContext from '../../../context/walletContext'

const Navbar = () => {
  const { wallet, setWallet } = useContext(WalletContext)

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
          style={'primaryBtn'}
          // onClick={() => dispatch(login())}
        />
      ) : (
        <div className={styles.walletInfoWrapper}>
          <img src={walletAvatar} alt={'avatar'} />
          <div className={styles.walletBalanceCol}>
            <p className={styles.address}>{addressFormat(wallet.address)}</p>
            <p className={styles.balance}>{wallet.balance}</p>
          </div>
          <img
            className={styles.logout}
            src={walletLogout}
            // onClick={() => dispatch(logout())}
            alt={'logout'}
          />
        </div>
      )}
    </nav>
  )
}

export default Navbar
