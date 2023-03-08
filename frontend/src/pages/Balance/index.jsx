import { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import BalanceInfoCard from 'components/BalanceInfoCard'
import Button from 'components/common/Button'
import Input from '../../components/common/Input'
import Table from '../../components/common/Table'
import daoCardLogo from 'static/svg/daoCardLogo.svg'
import linkIcon from 'static/svg/linkIcon.svg'
import daoService from 'store/services/daoService'
import styles from './styles.module.sass'
import {
  columnsAllProposals,
  columnsLockedTokens,
  columnsVoters,
} from './mocks'
import { WalletContext } from 'context/walletContext'
import { useQuery } from 'react-query'
import { fromNano } from 'helpers/decimalParser'

const Balance = () => {
  const { id } = useParams()
  const { state: ContextState } = useContext(WalletContext)
  const { addressContext } = ContextState

  const { data, isLoading } = useQuery(
    ['daoBalance', id],
    () => daoService.findDAOIfNotOwner(id, addressContext),
    {
      enabled: !!addressContext,
      refetchInterval: 1000,
    }
  )

  console.log('data: ', data)

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

  //console.log(data?.proposalConfiguration ? data : 'MEMBERS NO UNDEF')

  return data ? (
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
          <Link
            className={styles.createProposalLink}
            to={`/create-proposal/${data.slug}`}

            // state={{ daoRoot: data.daoRoot, ownerAddress: addressContext }}
          >
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
        <BalanceInfoCard
          name={'Members'}
          value={
            data.stakers && data.stakers.length > 0 ? data.stakers.length : '-'
          }
          className={styles.bic2}
        />
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
          name={`Threshold ${data.token ? data.token.value0 : ''}`}
          value={
            data.proposalConfiguration
              ? fromNano(data.proposalConfiguration.threshold, 9)
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
            <p className={styles.voting}>
              {`${
                data.userVoteWeigth ? data.userVoteWeigth : 0
              }% voting weigth`}
            </p>
          </div>
          <Link style={{ color: 'transparent' }} to={'balance-management'}>
            <Button style={'primaryBtn'} text={'Balance management'} />
          </Link>
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
        data={data.proposals}
        isLoading={isLoading}
      />
      <div className={styles.tableSectionHeading}>
        <p>Proposals with your locked tokens</p>
        <div className={styles.rightContentWrapper}>
          <Button
            style={'primaryBtn'}
            text={'Unlock all tokens'}
            onClick={async (e) => {
              await daoService
                .unlockVotes(data.daoAddress, 0, addressContext)
                .catch((e) => {
                  return
                })
            }}
          />
        </div>
      </div>
      <Table
        columns={columnsLockedTokens}
        data={data.proposalsWithLockedTokens}
        ownerAddress={addressContext}
        daoAddress={data.daoAddress}
      />
      <div className={styles.tableSectionHeading}>
        <p>Voters</p>
      </div>
      <Table columns={columnsVoters} data={data.voters} />
    </div>
  ) : (
    <Table columns={columns} data={dataTable} isLoading={true} />
  )
}

export default Balance
