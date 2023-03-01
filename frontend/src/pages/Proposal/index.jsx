import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { WalletContext } from 'context/walletContext'
import daoService from 'store/services/daoService'
import RouteBreadcrumbs from 'components/RouteBreadcrumbs'
import ContentHeader from 'components/common/ContentHeader'
import ProposalVotingCard from 'components/ProposalVotingCard'
import BalanceProposalInfo from 'components/BalanceProposalInfo'
import Button from 'components/common/Button'
import Accordion from 'components/common/Accordion'
import Timeline from 'components/Timeline'
import VotesModal from 'components/Modal/VotesModal'
import Table from 'components/common/Table'
import { addressFormat } from 'helpers/addressFormat'
import styles from './styles.module.sass'
import linkIcon from 'static/svg/linkIcon.svg'
import walletAvatar from 'static/svg/walletAvatar.svg'

const Subheading = ({ text }) => {
  return <h3 className={styles.subheading}>{text}</h3>
}

const Proposal = () => {
  const { id, id1 } = useParams()
  const { state: ContextState } = useContext(WalletContext)
  const { addressContext } = ContextState
  const { data, isLoading } = useQuery(
    ['daoBalance', id],
    () => daoService.getDaoInfo(id1, addressContext),
    {
      enabled: !!addressContext,
      refetchInterval: 1000,
    }
  )

  const [isOwner, setOwner] = useState({})
  useEffect(() => {
    if (data) {
      daoService
        .isOwner(data.daoAddress, addressContext, id)
        .then((data) => setOwner(data))
    }
  }, [])

  /*const [isActive, setActive] = useState({})
  useEffect(() => {
    if (data) {
      daoService
        .canUnlockVotes(data.daoAddress, id, addressContext)
        .then((data) => setActive(data))
    }
  }, [])*/

  const [counter, setCounter] = useState(0)
  const [queue, setQueue] = useState({})
  useEffect(() => {
    if (data && data?.proposals[id - 1].status == 'Succeeded' && counter < 1) {
      daoService.queue(data.daoAddress, id).then((data) => setQueue(data))
      setCounter(1)
    }
  })
  //console.log('queue: ', queue)
  //console.log('isOwner: ', isOwner)
  //console.log('data: ', data)
  //console.log('data date: ', data?.proposals[id - 1].startTime)
  const gracePeriodInHrs =
    (data?.proposalConfiguration.gracePeriod * 1) / (60 * 60)
  const votingDelayInHrs =
    (data?.proposalConfiguration.votingDelay * 1) / (60 * 60)
  const votingPeriodInHrs =
    (data?.proposalConfiguration.votingPeriod * 1) / (60 * 60)
  const timeLockInHrs = (data?.proposalConfiguration.timeLock * 1) / (60 * 60)

  const proposalTimelinePeriods = [
    votingDelayInHrs,
    votingPeriodInHrs,
    timeLockInHrs,
    gracePeriodInHrs,
  ]

  const timelineInDays =
    (gracePeriodInHrs + votingDelayInHrs + votingPeriodInHrs + timeLockInHrs) /
    24
  //console.log('timelineInDays: ', timelineInDays)
  //console.log('data in hours: ', dataInHrs)
  //console.log('proposal actions: ', data?.proposals[id - 1].proposalActions)
  let proposalActions = []
  //if (data != null && data.length > 0) {
  data?.proposals[id - 1].proposalActions.forEach((item, index) => {
    proposalActions.push(
      <Accordion title={'Everscale action'} content={data} />
    )
  })
  //}
  //console.log('proposalActions: ', proposalActions)
  const [open, setOpen] = useState(false)
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
  return data ? (
    <div className={styles.container}>
      <RouteBreadcrumbs
        text={id}
        daoName={data?.name}
        route={`dao/${data.slug}`}
      />
      <ContentHeader title={`#${id} ${data?.proposals[id - 1].summary}`}>
        <div className={styles.walletWrapper}>
          <img
            className={styles.walletAvatar}
            src={walletAvatar}
            alt={'wallet avatar'}
          />
          <div className={styles.addressInfo}>
            <div className={styles.name}>
              {addressFormat(data?.proposals[id - 1].proposer._address)}
            </div>
          </div>
          <a
            href={`https://everscan.io/accounts/${
              data?.proposals[id - 1].proposer._address
            }`}
            target={'_blank'}
          >
            <img src={linkIcon} alt={'link-icon'} />
          </a>
        </div>
      </ContentHeader>

      <div className={styles.proposalStatus}>
        {data?.proposals[id - 1].status === 'Failed' ||
        data?.proposals[id - 1].status === 'Expired' ? (
          <div className={styles.red}>{data?.proposals[id - 1].status}</div>
        ) : data?.proposals[id - 1].status === 'Pending' ||
          data?.proposals[id - 1].status === 'Active' ? (
          <div className={styles.darkBlueActive}>
            {data?.proposals[id - 1].status}
          </div>
        ) : data?.proposals[id - 1].status === 'Queued' ||
          data?.proposals[id - 1].status === 'Succeeded' ? (
          <div className={styles.yellow}>{data?.proposals[id - 1].status}</div>
        ) : data?.proposals[id - 1].status === 'Canceled' ? (
          <div className={styles.darkBlueInactive}>
            {data?.proposals[id - 1].status}
          </div>
        ) : (
          <div className={styles.green}>{data?.proposals[id - 1].status}</div>
        )}
        {data?.proposals[id - 1].actionInMS < 0 ? (
          <div></div>
        ) : (
          <div className={styles.time}>
            {data?.proposals[id - 1].actionIn
              ? `${data?.proposals[id - 1].actionIn} left`
              : ''}
          </div>
        )}
      </div>
      <div className={styles.proposal}>
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            <Subheading text={'Voting'} />
            <div className={styles.votingCardContainer}>
              <ProposalVotingCard
                heading={'For'}
                data={data}
                id={id}
                open={open}
                setOpen={setOpen}
              />
              <ProposalVotingCard
                heading={'Against'}
                data={data}
                id={id}
                open={open}
                setOpen={setOpen}
              />
            </div>
            <Subheading text={'Timeline'} />
            <div className={styles.timelineContainer}>
              <Timeline
                //day={data?.proposals[id - 1].dayForTimeline}
                data={data}
                id={id - 1}
                timelinePeriodsList={proposalTimelinePeriods}
                status={data?.proposals[id - 1].status}
              />
            </div>
            <Subheading text={'About proposal'} />
            <div className={styles.aboutProposalContainer}>
              <div className={styles.aboutSectionSubheading}>
                <h4 className={styles.subheadingText}>Description</h4>
                <div className={styles.linkWrapper}>
                  <p className={styles.discussion}>Discussion</p>
                  <img src={linkIcon} alt={'link-icon'} />
                </div>
              </div>
              <p className={styles.descriptionContent}>
                {data?.proposals[id - 1].description}
              </p>
              <h4 className={styles.subheadingText}>Actions</h4>
              {proposalActions}
              <h4 className={styles.subheadingText}>Periods</h4>
              <div className={styles.row}>
                <p className={styles.info}>Voting delay</p>
                <p className={styles.value}>{votingDelayInHrs}h</p>
              </div>
              <div className={styles.row}>
                <p className={styles.info}>Voting period</p>
                <p className={styles.value}>{votingPeriodInHrs}h</p>
              </div>
              <div className={styles.row}>
                <p className={styles.info}>Time lock</p>
                <p className={styles.value}>{timeLockInHrs}h</p>
              </div>
              <div className={styles.row}>
                <p className={styles.info}>Grace period</p>
                <p className={styles.value}>{gracePeriodInHrs}h</p>
              </div>
            </div>
          </div>
          <div className={styles.balanceProposalInfoWrapper}>
            {isOwner && data?.proposals[id - 1].status === 'Active' ? (
              <BalanceProposalInfo heading={'Proposal management'}>
                <Button
                  style={'primaryBtn'}
                  text={'Cancel proposal'}
                  onClick={async (e) => {
                    // console.log('deployedActions: ', deployedActions)
                    await daoService
                      .cancelProposal(id, data.daoAddress, addressContext)
                      .catch((e) => {
                        return
                      })
                  }}
                />
              </BalanceProposalInfo>
            ) : isOwner &&
              data?.proposals[id - 1].status === 'Queued' &&
              data?.proposals[id - 1].canExecuteProposal ? (
              <BalanceProposalInfo heading={'Proposal management'}>
                <Button
                  style={'lightBlueBtn'}
                  text={'Execute proposal'}
                  onClick={async (e) => {
                    // console.log('deployedActions: ', deployedActions)
                    await daoService
                      .executeProposal(data.daoAddress, id, addressContext)
                      .catch((e) => {
                        return
                      })
                  }}
                />
              </BalanceProposalInfo>
            ) : null}

            <BalanceProposalInfo
              heading={'Your vote'}
              status={data?.proposals[id - 1].isVoted.isVoted}
              support={data?.proposals[id - 1].userVoteSupport}
            >
              <div className={styles.infoRow}>
                <p className={styles.parameter}>
                  Voting power, {`${data?.token.value0}`}
                </p>
                <p className={styles.value}>
                  {data?.proposals[id - 1].isVoted.isVoted
                    ? data?.proposals[id - 1].isVoted.data.vote
                    : 0}
                </p>
              </div>
              {(data?.proposals[id - 1].voters.length < 1 ||
                !data?.proposals[id - 1].isVoted.isVoted) &&
              data?.proposals[id - 1].status === 'Active' ? (
                <div className={styles.buttonsWrapper}>
                  <Button
                    text={'Vote for'}
                    style={'greenBtn'}
                    onClick={async (e) => {
                      // console.log('deployedActions: ', deployedActions)
                      await daoService
                        .castVote(data.daoAddress, true, id, addressContext)
                        .catch((e) => {
                          return
                        })
                    }}
                  />
                  <Button
                    text={'Vote against'}
                    style={'redBtn'}
                    onClick={async (e) => {
                      // console.log('deployedActions: ', deployedActions)
                      await daoService
                        .castVote(data.daoAddress, false, id, addressContext)
                        .catch((e) => {
                          return
                        })
                    }}
                  />
                </div>
              ) : null}
              <div className={styles.infoRow}>
                <p className={styles.parameter}>Vote weight</p>
                <p className={styles.value}>
                  {data?.proposals[id - 1].isVoted.isVoted
                    ? `${data?.proposals[id - 1].proposalVoteWeigth}%`
                    : '0%'}
                </p>
              </div>
              <Button
                disabled={!data?.proposals[id - 1].canUnlock}
                style={
                  !data?.proposals[id - 1].canUnlock
                    ? 'disabledBtn'
                    : 'primaryBtn'
                }
                text={'Unlock Tokens'}
                onClick={async (e) => {
                  // console.log('deployedActions: ', deployedActions)
                  await daoService
                    .unlockVotes(data.daoAddress, id, addressContext)
                    .catch((e) => {
                      return
                    })
                }}
              />
              <p className={styles.notice}>
                Your tokens are locked. You can unlock them after voting to be
                able to withdraw.
              </p>
            </BalanceProposalInfo>
          </div>
        </div>
      </div>
      <VotesModal open={open} setOpen={setOpen} data={data} id={id} />
    </div>
  ) : (
    <Table columns={columns} data={dataTable} isLoading={true} />
  )
}

export default Proposal
