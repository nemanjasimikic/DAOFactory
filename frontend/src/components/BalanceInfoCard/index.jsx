import styles from './styles.module.sass'

const BalanceInfoCard = ({ name, value }) => {
  return (
    <div className={styles.balanceCardInfo}>
      <p className={styles.name}>{name}</p>
      <p className={styles.value}>{value}</p>
    </div>
  )
}

export default BalanceInfoCard
