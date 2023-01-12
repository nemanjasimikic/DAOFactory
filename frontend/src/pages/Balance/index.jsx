import { useEffect, useState, useContext } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import BalanceInfoCard from 'components/BalanceInfoCard'
import Button from 'components/common/Button'
import daoCardLogo from 'static/svg/daoCardLogo.svg'
import linkIcon from 'static/svg/linkIcon.svg'
import daoService from 'store/services/daoService'
import Input from '../../components/common/Input'
import Table from '../../components/common/Table'
import styles from './styles.module.sass'
import {
  columnsAllProposals,
  dataAllProposals,
  dataLockedTokens,
  columnsLockedTokens,
  columnsVoters,
  dataVoters,
} from './mocks'
import { WalletContext } from 'context/walletContext'

const Balance = () => {
  const navigate = useNavigate()

  const { id } = useParams()
  const { state: ContextState } = useContext(WalletContext)
  const {
    isLoginPending,
    isLoggedIn,
    loginError,
    addressContext,
    balanceContext,
  } = ContextState
  const [daoInformation, setDaoInformation] = useState({})
  useEffect(() => {
    daoService
      .getDaoInfo(id, addressContext)
      .then((data) => setDaoInformation(data))
  }, [])
  return (
    <div className={styles.container}>
      <div className={styles.balanceHeading}>
        <div className={styles.daoNameWrapper}>
          <img src={daoCardLogo} alt={'dao card logo'} />
          <div className={styles.nameWrapper}>
            <h3>{daoInformation.name}</h3>
            <p>daobuilder.nswebdevelopment.com/dao/{daoInformation.slug}</p>
          </div>
        </div>
        <div className={styles.rightSideWrapper}>
          <img src={linkIcon} alt={'link icon'} />
          <p>Addresses</p>
          <Link className={styles.createProposalLink} to={'/create-proposal'}>
            <Button style={'lightBlueBtn'} text={'Create a proposal'} />
          </Link>
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
      <div className={styles.tableSectionHeading}>
        <p>All Proposals</p>
        <div className={styles.rightContentWrapper}>
          <Input placeholder={'Search...'} registerInput={'search'} />
          <Button style={'primaryBtn'} text={'Votes'} />
          <Button style={'primaryBtn'} text={'Statuses'} />
        </div>
      </div>
      <Table columns={columnsAllProposals} data={dataAllProposals} />
      <div className={styles.tableSectionHeading}>
        <p>Proposals with your locked tokens</p>
        <div className={styles.rightContentWrapper}>
          <Button style={'primaryBtn'} text={'Unlock all tokens'} />
        </div>
      </div>
      <Table columns={columnsLockedTokens} data={dataLockedTokens} />
      <div className={styles.tableSectionHeading}>
        <p>Voters</p>
      </div>
      <Table columns={columnsVoters} data={dataVoters} />
    </div>
  )
}

export default Balance
