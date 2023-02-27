import Table from 'components/common/Table'
import VotesModal from 'components/Modal/VotesModal'
import styles from './styles.module.sass'
import { proposalColumns } from './mocks'

const ProposalVotingCard = ({ heading, data, id, open, setOpen }) => {
  const background = 0
    ? 'rgba(255, 255, 255, 0.08)'
    : `linear-gradient(to right, #4AB44A 0%, #4AB44A 20%, #EB4361 20%, #EB4361 100%)`
  return heading === 'For' ? (
    <div className={styles.proposalVotingCard}>
      <div className={styles.heading}>
        <h3 className={styles.headingText}>{heading}</h3>
        <div className={styles.headingData}>
          <h3 className={styles.currentValue}>
            {data?.proposals[id - 1].forVotes}
          </h3>
          of
          <h3 className={styles.maxValue}>
            {data?.proposalConfiguration.threshold}
          </h3>
        </div>
      </div>
      <div className={styles.line} style={{ background: background }} />
      <Table
        columns={proposalColumns}
        data={data?.proposals[id - 1].supportVotes}
      />
      <p className={styles.viewAllVoters}>View all voters</p>
    </div>
  ) : (
    <div className={styles.proposalVotingCard}>
      <div className={styles.heading}>
        <h3 className={styles.headingText}>{heading}</h3>
        <div className={styles.headingData}>
          <h3 className={styles.currentValue}>
            {data?.proposals[id - 1].againstVotes}
          </h3>
          of
          <h3 className={styles.maxValue}>
            {data?.proposalConfiguration.threshold}
          </h3>
        </div>
      </div>
      <div className={styles.line} style={{ background: background }} />
      <Table
        columns={proposalColumns}
        data={data?.proposals[id - 1].unsupportVotes}
      />
      <p onClick={() => setOpen(!open)} className={styles.viewAllVoters}>
        View all voters
      </p>
    </div>
  )
}

export default ProposalVotingCard
