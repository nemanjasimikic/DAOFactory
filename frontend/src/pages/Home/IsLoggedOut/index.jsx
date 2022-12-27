import styles from './styles.module.sass'
import centerArrows from 'static/svg/centerArrows.svg'
import decentralizedIcon from 'static/svg/decentralizedIcon.svg'
import stopwatch from 'static/png/stopwatch.png'
import walletIcon from 'static/svg/wallet.svg'
import Button from '../../../components/common/Button'
import { useEffect } from 'react'

const IsLoggedOut = ({ wallet }) => {
  // const dispatch = useDispatch()
  //
  // useEffect(() => {
  //   reset()
  // }, [wallet, dispatch])

  return (
    <div className={styles.isLoggedOut}>
      <h1>The simplest way to manage your own DAO</h1>
      <h3>Connect your wallet to create a DAO or manage existing one</h3>
      <Button
        style={'bigLightBlueBtn'}
        text={'Connect wallet'}
        // onClick={() => dispatch(login())}
      />
      <div className={styles.icons}>
        <div className={styles.iconContainer}>
          <div className={styles.iconWrapper}>
            <img src={stopwatch} alt={'stopwatch'} />
          </div>
          <p>From zero to DAO in 90 seconds</p>
        </div>
        <div className={styles.iconContainer}>
          <div className={styles.iconWrapper}>
            <img src={walletIcon} alt={'wallet'} />
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
