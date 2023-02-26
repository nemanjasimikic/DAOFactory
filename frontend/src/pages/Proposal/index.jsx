import { useState } from 'react'
import RouteBreadcrumbs from 'components/RouteBreadcrumbs'
import ContentHeader from 'components/common/ContentHeader'
import ProposalVotingCard from 'components/ProposalVotingCard'
import BalanceProposalInfo from 'components/BalanceProposalInfo'
import Button from 'components/common/Button'
import Accordion from 'components/common/Accordion'
import Timeline from 'components/Timeline'
import styles from './styles.module.sass'
import linkIcon from 'static/svg/linkIcon.svg'
import VotesModal from '../../components/Modal/VotesModal'

const Subheading = ({ text }) => {
  return <h3 className={styles.subheading}>{text}</h3>
}

const Proposal = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.container}>
      <RouteBreadcrumbs text={'ProposalId'} />
      <ContentHeader title={'#33 Proposal name'} />
      <div className={styles.proposalStatus}>
        <div className={styles.green}>Active</div>
        <div className={styles.time}>14 hrs 2min left</div>
      </div>
      <div className={styles.proposal}>
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            <Subheading text={'Voting'} />
            <div className={styles.votingCardContainer}>
              <ProposalVotingCard
                heading={'For'}
                open={open}
                setOpen={setOpen}
              />
              <ProposalVotingCard
                heading={'Against'}
                open={open}
                setOpen={setOpen}
              />
            </div>
            <Subheading text={'Timeline'} />
            <div className={styles.timelineContainer}>
              <Timeline />
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
              <p className={styles.parameter}>Voting power</p>
              <p className={styles.value}>2000000</p>
            </div>
            <div className={styles.buttonsWrapper}>
              <Button text={'Vote for'} style={'greenBtn'} />
              <Button text={'Vote against'} style={'redBtn'} />
            </div>
            <div className={styles.infoRow}>
              <p className={styles.parameter}>Vote weight</p>
              <p className={styles.value}>11.65</p>
            </div>
            <Button
              disabled={true}
              style={'disabledBtn'}
              text={'Unlock Tokens'}
            />
            <p className={styles.notice}>
              Your tokens are locked. You can unlock them after voting to be
              able to withdraw.
            </p>
          </BalanceProposalInfo>
        </div>
      </div>
      <VotesModal open={open} setOpen={setOpen} />
    </div>
  )
}

export default Proposal
