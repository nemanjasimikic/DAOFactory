import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from 'store/features/walletSlice'
import Button from 'components/common/Button'
import styles from './styles.module.sass'

const Navbar = () => {
  const dispatch = useDispatch()

  const wallet = useSelector((state) => state.wallet)

  console.log('WALLET', wallet.balance)
  // console.log('WALLET Address', wallet.address)

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
        to={'/connected'}
        className={({ isActive }) =>
          isActive ? styles.active : styles.navLink
        }
      >
        My DAOs
      </NavLink>
      {/*<Link to={'/connected'}>*/}
      {wallet.wallet === null ? (
        <Button
          text={'Connect wallet'}
          type={'primaryBtn'}
          onClick={() => dispatch(login())}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ color: 'white' }}>{wallet.wallet}</div>
          <div style={{ color: 'red' }}>{wallet.balance}</div>
        </div>
      )}
      {/*</Link>*/}
    </nav>
  )
}

export default Navbar
