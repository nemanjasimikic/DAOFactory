import styles from './styles.module.sass'
import breadcrumbArrow from 'static/svg/breadcrumbArrow.svg'

const RouteBreadcrumbs = () => {
  return (
    <div className={styles.routeBreadcrumbs}>
      <p className={styles.inactive}>$DAO_NAME</p>
      <img
        className={styles.arrow}
        src={breadcrumbArrow}
        alt={'breadcrumb arrow'}
      />
      <p className={styles.active}>Your balance</p>
    </div>
  )
}

export default RouteBreadcrumbs
