import styles from './styles.module.sass'
import tokenImage from 'static/svg/tokenImage.svg'

const YourAccountCard = ({ text, token }) => {
  return (
    <div className={styles.yourAccountCard}>
      <p className={styles.cardText}>{text}</p>
      <div className={styles.tokenRow}>
        <img src={tokenImage} alt={'token-image'} />
        <p className={styles.token}>0</p>
        <p className={styles.token}>LOL</p>
      </div>
    </div>
  )
}

export default YourAccountCard
