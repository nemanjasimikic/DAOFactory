import styles from './styles.module.sass'
import tokenImage from 'static/svg/walletAvatar.svg'
import { dataAllProposals } from 'pages/Balance/mocks'

const YourAccountCard = ({ text, data, symbol }) => {
  let symbol0 = symbol ? (
    <img src={tokenImage} alt={'token-image'} />
  ) : (
    <div></div>
  )

  return (
    <div className={styles.yourAccountCard}>
      <p className={styles.cardText}>{text}</p>
      <div className={styles.tokenRow}>
        {symbol0}
        <p className={styles.token}>{data}</p>
        <p className={styles.token}>{symbol ? '' : symbol?.value0}</p>
      </div>
    </div>
  )
}

export default YourAccountCard
