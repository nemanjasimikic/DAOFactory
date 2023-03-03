import { Link, NavLink, useLocation } from 'react-router-dom'
import Breadcrumbs from 'components/Breadcrumbs'
import Button from 'components/common/Button'

import styles from './styles.module.sass'
import leftArrow from 'static/svg/leftArrow.svg'

const RenderDaoSettings = ({ id }) => (
  <>
    <NavLink
      to={`/dao-settings/general/${id}`}
      className={({ isActive }) => (isActive ? styles.active : styles.navLink)}
    >
      General
    </NavLink>
    <NavLink
      to={`/dao-settings/ownership/${id}`}
      className={({ isActive }) => (isActive ? styles.active : styles.navLink)}
    >
      Ownership
    </NavLink>
    <a className={styles.navLink}>DAO Own domain</a>
  </>
)

const Sidebar = ({ page, setPage, id }) => {
  const location = useLocation()
  return (
    <div className={styles.sidebar}>
      <Link to={'/'} className={styles.backButton}>
        <div className={ id !== undefined ? styles.minusLeftMargin : null}>
          <Button className={styles.backBtn} style={'transparentBtn'} text={'Back'} leftArrow={leftArrow} />
        </div>
      </Link>
      {location.pathname === '/create-dao' ? (
        <Breadcrumbs page={page} setPage={setPage} />
      ) : (
        <RenderDaoSettings id={id} />
      )}
    </div>
  )
}

export default Sidebar
