import styles from './styles.module.sass'
import breadcrumbArrow from 'static/svg/breadcrumbArrow.svg'

const RouteBreadcrumbs = ({ text, daoName }) => {

  let daoNameF = !daoName ? '...loading' : daoName

  return (
    <div className={styles.routeBreadcrumbs}>
      <p className={styles.inactive}>{daoNameF}</p>
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
