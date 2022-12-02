import { Link } from 'react-router-dom'
import styles from './styles.module.sass'
import centerArrows from 'static/svg/centerArrows.svg'
import decentralizedIcon from 'static/svg/decentralizedIcon.svg'
import stopwatch from 'static/png/stopwatch.png'
import wallet from 'static/svg/wallet.svg'
import Button from '../../../components/common/Button'

const IsLoggedOut = () => {
  return (
    <div className={styles.isLoggedOut}>
      <h1>The simplest way to manage your own DAO</h1>
      <h3>Connect your wallet to create a DAO or manage existing one</h3>
      <Link className={styles.link} to={'/connected'}>
        <Button type={'bigLightBlueBtn'} text={'Connect wallet'} />
      </Link>
      <div className={styles.icons}>
        <div className={styles.iconContainer}>
          <div className={styles.iconWrapper}>
            <img src={stopwatch} alt={'stopwatch'} />
          </div>
          <p>From zero to DAO in 90 seconds</p>
        </div>
        <div className={styles.iconContainer}>
          <div className={styles.iconWrapper}>
            <img src={wallet} alt={'wallet'} />
          </div>
          <p>Free to create</p>
        </div>
        <div className={styles.iconContainer}>
          <div className={styles.iconWrapper}>
            <img src={centerArrows} alt={'center arrows'} />
          </div>
          <p>Own unique address</p>
        </div>
        <div className={styles.iconContainer}>
          <div className={styles.iconWrapper}>
            <img src={decentralizedIcon} alt={'decentralized'} />
          </div>
          <p>
            Altering your project <br /> governance to decentralized.
          </p>
        </div>
      </div>
    </div>
  )
}

export default IsLoggedOut
