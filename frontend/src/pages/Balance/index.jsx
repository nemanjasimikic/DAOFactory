import RouteBreadcrumbs from 'components/RouteBreadcrumbs'
import NoResults from 'components/NoResults'

import styles from './styles.module.sass'

const Balance = () => {
  return (
    <div className={styles.container}>
      <RouteBreadcrumbs />
      <NoResults />
    </div>
  )
}

export default Balance
