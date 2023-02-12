import Table from 'components/common/Table'
import styles from './styles.module.sass'
import { proposalColumns } from './mocks'

const ProposalVotingCard = ({ heading }) => {
  return (
    <div className={styles.proposalVotingCard}>
      <div className={styles.heading}>
        <h3 className={styles.headingText}>{heading}</h3>
        <div className={styles.headingData}>
          <h3 className={styles.currentValue}>829138291</h3>
          of
          <h3 className={styles.maxValue}>1000000000</h3>
        </div>
      </div>
      <Table columns={proposalColumns} />
    </div>
  )
}

export default ProposalVotingCard
