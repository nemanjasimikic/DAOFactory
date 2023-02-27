import { useState, useEffect } from 'react'
import RouteBreadcrumbs from 'components/RouteBreadcrumbs'
import ContentHeader from 'components/common/ContentHeader'
import ProposalVotingCard from 'components/ProposalVotingCard'
import BalanceProposalInfo from 'components/BalanceProposalInfo'
import Button from 'components/common/Button'
import Accordion from 'components/common/Accordion'
import Timeline from 'components/Timeline'
import styles from './styles.module.sass'
import daoService from 'store/services/daoService'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { WalletContext } from 'context/walletContext'
import { useQuery } from 'react-query'
import linkIcon from 'static/svg/linkIcon.svg'
import VotesModal from '../../components/Modal/VotesModal'

const Subheading = ({ text }) => {
  return <h3 className={styles.subheading}>{text}</h3>
}

const Proposal = () => {
  const { id, id1 } = useParams()
  const { state: ContextState } = useContext(WalletContext)
  const { addressContext } = ContextState
  console.log('params: ', id, id1)
  const { data, isLoading } = useQuery(
    ['daoBalance', id],
    () => daoService.getDaoInfo(id1, addressContext),
    {
      enabled: !!addressContext,
      cacheTime: 30 * 1000,
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

  console.log('isOwner: ', isOwner)

  console.log('data: ', data)
  console.log('data date: ', data?.proposals[id - 1].startTime)
  const gracePeriodInHrs =
    (data?.proposalConfiguration.gracePeriod * 1) / (60 * 60)
  const votingDelayInHrs =
    (data?.proposalConfiguration.votingDelay * 1) / (60 * 60)
  const votingPeriodInHrs =
    (data?.proposalConfiguration.votingPeriod * 1) / (60 * 60)
  const timeLockInHrs = (data?.proposalConfiguration.timeLock * 1) / (60 * 60)

  let proposalActions = []
  //if (data != null && data.length > 0) {
  data?.proposals[id - 1].proposalActions.forEach((item, index) => {
    proposalActions.push(
      <Accordion title={'Everscale action'} content={data} />
    )
  })
  //}
  console.log('proposalActions: ', proposalActions)
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.container}>
      <RouteBreadcrumbs text={id} daoName={data?.name} />
      <ContentHeader title={`#${id} ${data?.proposals[id - 1].summary}`} />

      <div className={styles.proposalStatus}>
        {data?.proposals[id - 1].status === 'Failed' ? (
          <div className={styles.red}>{data?.proposals[id - 1].status}</div>
        ) : (
          <div className={styles.green}>{data?.proposals[id - 1].status}</div>
        )}
        {data?.proposals[id - 1].actionInMS < 0 ? (
          <div></div>
        ) : (
          <div className={styles.time}>14 hrs 2min left</div>
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
              {/* <Accordion title={'Title 1'} /> */}
              {/* <Accordion title={'Title 2'} /> */}
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

          {isOwner && data?.proposals[id - 1].status === 'Active' ? (
            <BalanceProposalInfo heading={'Proposal management'}>
              <Button style={'primaryBtn'} text={'Cancel proposal'} />
            </BalanceProposalInfo>
          ) : isOwner && data?.proposals[id - 1].status === 'Queued' ? (
            <BalanceProposalInfo heading={'Proposal management'}>
              <Button style={'lightBlueBtn'} text={'Execute proposal'} />
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
            data?.proposals[id - 1].status !== 'Failed' ? (
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
                  ? data?.proposals[id - 1].isVoted.data.vote
                  : 0}
              </p>
            </div>
            <Button
              disabled={true}
              style={'disabledBtn'}
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
      <VotesModal
        open={open}
        setOpen={setOpen}
        data={data?.proposals[id - 1]}
      />
    </div>
  )
}

export default Proposal
