import styles from './styles.module.sass'

import Button from 'components/common/Button'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
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
      <Link to={'/connected'}>
        <Button text={'Connect wallet'} type={'primaryBtn'} />
      </Link>
    </nav>
  )
}

export default Navbar
