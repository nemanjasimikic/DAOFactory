import styles from './styles.module.sass'

const BalanceProposalInfo = ({
  heading,
  status,
  children,
  disabled,
  support,
}) => {
  return (
    <div className={styles.balanceProposalInfo}>
      <div className={styles.heading}>
        <p className={styles.title}>{heading}</p>
        {status ? (
          support ? (
            <p className={styles.green}>For</p>
          ) : (
            <p className={styles.red}>Against</p>
          )
        ) : null}
      </div>
      {children}
    </div>
  )
}

export default BalanceProposalInfo
