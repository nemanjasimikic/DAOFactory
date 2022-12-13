import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import RouteBreadcrumbs from 'components/RouteBreadcrumbs'
import ContentHeader from 'components/common/ContentHeader'
import NoResults from 'components/NoResults'
import styles from './styles.module.sass'

const Balance = () => {
  const wallet = useSelector((state) => state.wallet)
  const navigate = useNavigate()

  useEffect(() => {
    if (wallet.wallet === null) {
      navigate('/')
    }
  }, [wallet, navigate])

  return (
    <div className={styles.container}>
      <RouteBreadcrumbs />
      <ContentHeader title={'DAO name'} />
      {/*<NoResults />*/}
    </div>
  )
}

export default Balance
