import styles from './styles.module.sass'
import breadcrumbArrow from 'static/svg/breadcrumbArrow.svg'
import { Link } from 'react-router-dom'

const RouteBreadcrumbs = ({ text, daoName, route }) => {
  let daoNameF = !daoName ? '...loading' : daoName
  return (
    <div className={styles.routeBreadcrumbs}>
      <Link to={`/${route ? route : ''}`}>
        <p className={styles.inactive}>{daoNameF}</p>
      </Link>

      <img
        className={styles.arrow}
        src={breadcrumbArrow}
        alt={'breadcrumb arrow'}
      />
      <p className={styles.active}>{text}</p>
    </div>
  )
}

export default RouteBreadcrumbs
