import RouteBreadcrumbs from 'components/RouteBreadcrumbs'
import ContentHeader from 'components/common/ContentHeader'
import ProposalVotingCard from 'components/ProposalVotingCard'
import BalanceProposalInfo from 'components/BalanceProposalInfo'
import Button from 'components/common/Button'
import styles from './styles.module.sass'

const Subheading = ({ text }) => {
  return <h3 className={styles.subheading}>{text}</h3>
}

const Proposal = () => {
  return (
    <div className={styles.container}>
      <RouteBreadcrumbs text={'ProposalId'} />
      <ContentHeader title={'#33 Proposal name'} />
      <div className={styles.proposal}>
        <div className={styles.contentWrapper}>
          <Subheading text={'Voting'} />
          <div className={styles.content}>
            <div className={styles.votingCardContainer}>
              <ProposalVotingCard heading={'For'} />
              <ProposalVotingCard heading={'Against'} />
            </div>
            <BalanceProposalInfo heading={'Your vote'}>
              <div className={styles.infoRow}>
                <p className={styles.votingPower}>Voting power</p>
                <p className={styles.value}>2000000</p>
              </div>
              <div className={styles.buttonsWrapper}>
                <Button text={'Vote for'} style={'greenBtn'} />
                <Button text={'Vote against'} style={'redBtn'} />
              </div>
            </BalanceProposalInfo>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Proposal
