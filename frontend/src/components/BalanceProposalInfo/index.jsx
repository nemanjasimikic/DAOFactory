import styles from './styles.module.sass'

const BalanceProposalInfo = ({ heading, status, children, disabled }) => {
  return (
    <div className={styles.balanceProposalInfo}>
      <div className={styles.heading}>
        <p className={styles.title}>{heading}</p>
        {status ? <p className={styles.green}>For</p> : null}
      </div>
      {children}
    </div>
  )
}

export default BalanceProposalInfo
