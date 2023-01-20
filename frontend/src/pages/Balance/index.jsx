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
import { useQuery } from 'react-query'

const Balance = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { state: ContextState, login } = useContext(WalletContext)
  const {
    isLoginPending,
    isLoggedIn,
    loginError,
    addressContext,
    balanceContext,
  } = ContextState

  console.log('address: ', addressContext)
  const { data, isIdle, error, isError, isLoading } = useQuery(
    ['daoBalance', id],
    () => daoService.getDaoInfo(id, addressContext),
    {
      enabled: !!addressContext,
    }
  )

  const [proposalInformation, setProposalInformation] = useState({})
  useEffect(() => {
    daoService.getProposals().then((data) => setProposalInformation(data))
  }, [])

  const [stakeholdersInformation, setStakeholdersInformation] = useState({})
  useEffect(() => {
    daoService
      .getAllStakeholders()
      .then((data) => setStakeholdersInformation(data))
  }, [])
  const columns = [
    {
      key: 'id',
      title: '#',
      width: 100,
    },
    {
      key: 'dao',
      title: 'DAO',
      width: 400,
    },
    {
      key: 'members',
      title: 'Members',
      width: 400,
    },
    {
      key: 'address',
      title: 'Address',
      width: 400,
    },
  ]

  const dataTable = [
    {
      id: '1',
      dao: 'dao1',
      members: 'members1',
      address: 'address1',
    },
    {
      id: '2',
      dao: 'dao2',
      members: 'members2',
      address: 'address2',
    },
    {
      id: '3',
      dao: 'dao3',
      members: 'members3',
      address: 'address3',
    },
    {
      id: '4',
      dao: 'dao4',
      members: 'members4',
      address: 'address4',
    },
  ]

  console.log('isLoading: ', isLoading)
  console.log('data in balance: ', data)
  return proposalInformation[0] && data ? (
    <div className={styles.container}>
      <div className={styles.balanceHeading}>
        <div className={styles.daoNameWrapper}>
          <img src={daoCardLogo} alt={'dao card logo'} />
          <div className={styles.nameWrapper}>
            <h3>{data.name}</h3>
            <p>daobuilder.nswebdevelopment.com/dao/{data.slug}</p>
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
          value={data.token ? data.token.value0 : '-'}
          className={styles.bic1}
        />
        <BalanceInfoCard name={'Members'} value={'-'} className={styles.bic2} />
        <BalanceInfoCard
          name={'Quorum'}
          value={`${
            data.proposalConfiguration
              ? data.proposalConfiguration.quorumVotes
              : 0
          }%`}
          className={styles.bic3}
        />
        <BalanceInfoCard
          name={`Token amount, ${data.token ? data.token.value0 : ''}`}
          value={data.daoBalance ? data.daoBalance : '-'}
          className={styles.bic4}
        />
        <BalanceInfoCard
          name={'Proposals'}
          value={data.nrOfProposals}
          className={styles.bic5}
        />
        <BalanceInfoCard
          name={`Threshold, ${data.token ? data.token.value0 : ''}`}
          value={
            data.proposalConfiguration
              ? data.proposalConfiguration.threshold
              : 0
          }
          className={styles.bic6}
        />
        <div className={styles.bic7}>{data.description}</div>
        <div className={styles.bic8}>
          <div className={styles.infoWrapper}>
            <p className={styles.yourBalance}>Your balance</p>
            <h3 className={styles.balanceValue}>
              {data.userBalance ? data.userBalance : '-'}{' '}
              {data.token ? data.token.value0 : ''}
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
      <Table
        columns={columnsAllProposals}
        data={proposalInformation}
        isLoading={isLoading}
      />
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
      <Table columns={columnsVoters} data={stakeholdersInformation} />
    </div>
  ) : (
    <Table columns={columns} data={dataTable} isLoading={true} />
  )
}

export default Balance
