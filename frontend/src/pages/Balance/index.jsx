import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import RouteBreadcrumbs from 'components/RouteBreadcrumbs'
import ContentHeader from 'components/common/ContentHeader'
import BalanceInfoCard from 'components/BalanceInfoCard'
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
      <div className={styles.balanceGrid}>
        <BalanceInfoCard className={styles.bic1} />
        <BalanceInfoCard className={styles.bic2} />
        <BalanceInfoCard className={styles.bic3} />
        <BalanceInfoCard className={styles.bic4} />
        <BalanceInfoCard className={styles.bic5} />
        <BalanceInfoCard className={styles.bic6} />
        <div className={styles.bic7}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </div>
        <div className={styles.bic8}>8</div>
      </div>
    </div>
  )
}

export default Balance
