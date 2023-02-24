import RouteBreadcrumbs from 'components/RouteBreadcrumbs'
import ContentHeader from 'components/common/ContentHeader'
import ProposalVotingCard from 'components/ProposalVotingCard'
import BalanceProposalInfo from 'components/BalanceProposalInfo'
import Button from 'components/common/Button'
import Accordion from 'components/common/Accordion'
import styles from './styles.module.sass'
import daoService from 'store/services/daoService'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { WalletContext } from 'context/walletContext'
import { useQuery } from 'react-query'
import linkIcon from 'static/svg/linkIcon.svg'

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

  console.log('data: ', data)
  return (
    <div className={styles.container}>
      <RouteBreadcrumbs text={id} daoName={data?.name} />
      <ContentHeader title={`#${id} ${data?.proposals[id - 1].summary}`} />
      <div className={styles.proposal}>
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            <Subheading text={'Voting'} />
            <div className={styles.votingCardContainer}>
              <ProposalVotingCard heading={'For'} data={data} id={id} />
              <ProposalVotingCard heading={'Against'} data={data} id={id} />
            </div>
            <Subheading text={'Timeline'} />
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
                The general problem The current rules and social mechanics of
                Wikipedia discourage people from contributing. The existing
                community is much smaller than it potentially could be. Many
                Wikipedia mechanics and bureaucratic procedures are easy to
                abuse. That leads to a lack of trust between community members.
                These problems lower user engagement and turn potentially very
                experienced and seasoned professionals and knowledgeable
                individuals away.
              </p>
              <h4 className={styles.subheadingText}>Actions</h4>
              <Accordion title={'Title 1'} />
              <Accordion title={'Title 2'} />
              <h4 className={styles.subheadingText}>Periods</h4>
              <div className={styles.row}>
                <p className={styles.info}>Voting delay</p>
                <p className={styles.value}>Value</p>
              </div>
              <div className={styles.row}>
                <p className={styles.info}>Voting period</p>
                <p className={styles.value}>Value</p>
              </div>
              <div className={styles.row}>
                <p className={styles.info}>Time lock</p>
                <p className={styles.value}>Value</p>
              </div>
              <div className={styles.row}>
                <p className={styles.info}>Grace period</p>
                <p className={styles.value}>Value</p>
              </div>
            </div>
          </div>

          {/*<BalanceProposalInfo heading={'Proposal management'}>*/}
          {/*  <Button style={'primaryBtn'} text={'Cancel proposal'} />*/}
          {/*  <Button style={'lightBlueBtn'} text={'Execute proposal'} />*/}
          {/*</BalanceProposalInfo>*/}

          <BalanceProposalInfo heading={'Your vote'}>
            <div className={styles.infoRow}>
              <p className={styles.parameter}>
                Voting power, {`${data?.token.value0}`}
              </p>
              <p className={styles.value}>{data?.userBalance}</p>
            </div>
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
            <div className={styles.infoRow}>
              <p className={styles.parameter}>Vote weight</p>
              <p className={styles.value}>11.65</p>
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
    </div>
  )
}

export default Proposal
