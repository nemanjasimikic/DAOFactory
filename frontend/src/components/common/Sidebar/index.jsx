import { Link, NavLink, useLocation } from 'react-router-dom'
import Breadcrumbs from 'components/Breadcrumbs'
import Button from 'components/common/Button'

import styles from './styles.module.sass'
import leftArrow from 'static/svg/leftArrow.svg'

const RenderDaoSettings = () => (
  <>
    <NavLink
      to={'/dao-settings/general'}
      className={({ isActive }) => (isActive ? styles.active : styles.navLink)}
    >
      General
    </NavLink>
    <NavLink
      to={'/dao-settings/ownership'}
      className={({ isActive }) => (isActive ? styles.active : styles.navLink)}
    >
      Ownership
    </NavLink>
    <a className={styles.navLink}>DAO Own domain</a>
  </>
)

const Sidebar = ({ page, setPage }) => {
  const location = useLocation()

  return (
    <div className={styles.sidebar}>
      <Link to={'/'} className={styles.backButton}>
        <Button style={'transparentBtn'} text={'Back'} leftArrow={leftArrow} />
      </Link>
      {location.pathname === '/create-dao' ? (
        <Breadcrumbs page={page} setPage={setPage} />
      ) : (
        <RenderDaoSettings />
      )}
    </div>
  )
}

export default Sidebar
