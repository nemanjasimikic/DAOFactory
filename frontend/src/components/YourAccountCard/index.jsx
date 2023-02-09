import styles from './styles.module.sass'
import tokenImage from 'static/svg/tokenImage.svg'
import { dataAllProposals } from 'pages/Balance/mocks'

const YourAccountCard = ({ text, data, symbol }) => {
  return (
    <div className={styles.yourAccountCard}>
      <p className={styles.cardText}>{text}</p>
      <div className={styles.tokenRow}>
        <img src={tokenImage} alt={'token-image'} />
        <p className={styles.token}>{data}</p>
        <p className={styles.token}>{symbol.value0}</p>
      </div>
    </div>
  )
}

export default YourAccountCard
