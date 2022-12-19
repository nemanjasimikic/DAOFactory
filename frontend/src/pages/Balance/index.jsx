import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BalanceInfoCard from 'components/BalanceInfoCard'
import Button from 'components/common/Button'
import daoCardLogo from 'static/svg/daoCardLogo.svg'
import linkIcon from 'static/svg/linkIcon.svg'
import styles from './styles.module.sass'

const Balance = () => {
  const wallet = useSelector((state) => state.wallet)
  const navigate = useNavigate()

  useEffect(() => {
    if (wallet.wallet === null) {
      navigate('/')
    }
  }, [wallet, navigate])

  return (
    <div className={styles.container}>
      <div className={styles.balanceHeading}>
        <div className={styles.daoNameWrapper}>
          <img src={daoCardLogo} alt={'dao card logo'} />
          <div className={styles.nameWrapper}>
            <h3>DAO name</h3>
            <p>projectsite.ever</p>
          </div>
        </div>
        <div className={styles.rightSideWrapper}>
          <img src={linkIcon} alt={'link icon'} />
          <p>Addresses</p>
          <Button style={'lightBlueBtn'} text={'Create a proposal'} />
        </div>
      </div>
      <div className={styles.balanceGrid}>
        <BalanceInfoCard
          name={'Governance token'}
          value={'XZC'}
          className={styles.bic1}
        />
        <BalanceInfoCard
          name={'Members'}
          value={'888 888'}
          className={styles.bic2}
        />
        <BalanceInfoCard
          name={'Quorum'}
          value={'51%'}
          className={styles.bic3}
        />
        <BalanceInfoCard
          name={'Token amount, ZXC'}
          value={'888 888 888'}
          className={styles.bic4}
        />
        <BalanceInfoCard
          name={'Proposals'}
          value={'888 888'}
          className={styles.bic5}
        />
        <BalanceInfoCard
          name={'Threshold, ZXC'}
          value={'888 888 888'}
          className={styles.bic6}
        />
        <div className={styles.bic7}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </div>
        <div className={styles.bic8}>
          <div className={styles.infoWrapper}>
            <p className={styles.yourBalance}>Your balance</p>
            <h3 className={styles.balanceValue}>888 888 888 XZC</h3>
            <p className={styles.voting}>10% voting weight</p>
          </div>
          <Button style={'primaryBtn'} text={'Balance management'} />
        </div>
      </div>
    </div>
  )
}

export default Balance
