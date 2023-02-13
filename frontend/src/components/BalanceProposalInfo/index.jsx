import styles from './styles.module.sass'

const BalanceProposalInfo = ({ heading, children }) => {
  return (
    <div className={styles.balanceProposalInfo}>
      <p className={styles.heading}>{heading}</p>
      {children}
    </div>
  )
}

export default BalanceProposalInfo
