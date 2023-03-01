import styles from './styles.module.sass'

const BalanceProposalInfo = ({
  heading,
  status,
  children,
  disabled,
  support,
  customStyle
}) => {
  return (
    <div className={styles.balanceProposalInfo} style={customStyle}>
      <div className={styles.heading} style={{ margin: customStyle ? 0 : null}}>
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
