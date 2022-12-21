import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import BalanceInfoCard from 'components/BalanceInfoCard'
import Button from 'components/common/Button'
import daoCardLogo from 'static/svg/daoCardLogo.svg'
import linkIcon from 'static/svg/linkIcon.svg'
import styles from './styles.module.sass'
import daoService from 'store/services/daoService'

const Balance = () => {
  const wallet = useSelector((state) => state.wallet)
  const navigate = useNavigate()

  useEffect(() => {
    if (wallet.wallet === null) {
      navigate('/')
    }
  }, [wallet, navigate])

  const { id } = useParams()
  const [daoInformation, setDaoInformation] = useState({})
  useEffect(() => {
    daoService.getDaoInfo(id).then((data) => setDaoInformation(data))
  }, [])

  console.log('daoInformation: ', daoInformation)
  return (
    <div className={styles.container}>
      <div className={styles.balanceHeading}>
        <div className={styles.daoNameWrapper}>
          <img src={daoCardLogo} alt={'dao card logo'} />
          <div className={styles.nameWrapper}>
            <h3>{daoInformation.name}</h3>
            <p>daobuilder.io/{daoInformation.slug}</p>
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
          value={daoInformation.token ? daoInformation.token.value0 : '-'}
          className={styles.bic1}
        />
        <BalanceInfoCard name={'Members'} value={'-'} className={styles.bic2} />
        <BalanceInfoCard
          name={'Quorum'}
          value={`${
            daoInformation.proposalConfiguration
              ? daoInformation.proposalConfiguration.quorumVotes
              : 0
          }%`}
          className={styles.bic3}
        />
        <BalanceInfoCard
          name={`Token amount, ${
            daoInformation.token ? daoInformation.token.value0 : ''
          }`}
          value={daoInformation.daoBalance ? daoInformation.daoBalance : '-'}
          className={styles.bic4}
        />
        <BalanceInfoCard
          name={'Proposals'}
          value={daoInformation.nrOfProposals}
          className={styles.bic5}
        />
        <BalanceInfoCard
          name={`Threshold, ${
            daoInformation.token ? daoInformation.token.value0 : ''
          }`}
          value={
            daoInformation.proposalConfiguration
              ? daoInformation.proposalConfiguration.threshold
              : 0
          }
          className={styles.bic6}
        />
        <div className={styles.bic7}>{daoInformation.description}</div>
        <div className={styles.bic8}>
          <div className={styles.infoWrapper}>
            <p className={styles.yourBalance}>Your balance</p>
            <h3 className={styles.balanceValue}>
              {daoInformation.userBalance ? daoInformation.userBalance : '-'}{' '}
              {daoInformation.token ? daoInformation.token.value0 : ''}
            </h3>
            <p className={styles.voting}>0% voting weight</p>
          </div>
          <Button style={'primaryBtn'} text={'Balance management'} />
        </div>
      </div>
    </div>
  )
}

export default Balance
