import RouteBreadcrumbs from 'components/RouteBreadcrumbs'
import ContentHeader from 'components/common/ContentHeader'
import ProposalVotingCard from 'components/ProposalVotingCard'
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
        <div className={styles.content}>
          <Subheading text={'Voting'} />
          <div className={styles.votingCardContainer}>
            <ProposalVotingCard />
            <ProposalVotingCard />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Proposal
