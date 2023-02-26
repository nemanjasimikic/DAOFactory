import styles from './styles.module.sass'

const BalanceProposalInfo = ({ heading, status, children }) => {
  return (
    <div className={styles.balanceProposalInfo}>
      <div className={styles.heading}>
        <p className={styles.title}>{heading}</p>
        <p className={styles.green}>For</p>
      </div>
      {children}
    </div>
  )
}

export default BalanceProposalInfo
