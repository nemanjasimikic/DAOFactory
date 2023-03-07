import { addressFormat } from '../../helpers/addressFormat'
import styles from './styles.module.sass'
import walletAvatar from 'static/svg/walletAvatar.svg'
import { fromNano } from 'helpers/decimalParser'

const VoteListItem = ({ item }) => {
  return (
    <div className={styles.voteListItem}>
      <div className={styles.voterWrapper}>
        <img src={walletAvatar} alt={'voter avatar'} />
        <p>{addressFormat(item.voter)}</p>
      </div>
      <p>{item.vote}</p>
    </div>
  )
}

const ProposalVotingCard = ({ heading, data, id, open, setOpen }) => {
  const votesPercentage = (votes) => {
    return (votes / data?.proposalConfiguration.threshold) * 100
  }
  const background = (forVotes) => {
    if (!data) {
      return 'rgba(255, 255, 255, 0.08)'
    }
    return `linear-gradient(to right, ${
      forVotes ? '#4AB44A' : ' #EB4361'
    } 0%, ${forVotes ? '#4AB44A' : ' #EB4361'} ${votesPercentage(
      forVotes
        ? data?.proposals[id - 1].forVotes
        : data?.proposals[id - 1].againstVotes
    )}%, rgba(255, 255, 255, 0.08) ${votesPercentage(
      forVotes
        ? data?.proposals[id - 1].forVotes
        : data?.proposals[id - 1].againstVotes
    )}%, rgba(255, 255, 255, 0.08) 100%)`
  }

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
            {fromNano(data?.proposalConfiguration.threshold, 9)}
          </h3>
        </div>
      </div>
      <div className={styles.line} style={{ background: background(true) }} />
      <div className={styles.tableHeading}>
        <p>Voter</p>
        <p>Vote</p>
      </div>
      {data?.proposals[id - 1].supportVotes.map((item) => (
        <VoteListItem item={item} />
      ))}
      <p onClick={() => setOpen(!open)} className={styles.viewAllVoters}>
        View all voters
      </p>
    </div>
  ) : (
    <div className={styles.proposalVotingCard}>
      <div className={styles.heading}>
        <h3 className={styles.headingText}>{heading}</h3>
        <div className={styles.headingData}>
          <h3 className={styles.currentValue}>
            {data?.proposals[id - 1].againstVotes}
          </h3>
          {/* of
          <h3 className={styles.maxValue}>
            {fromNano(data?.proposalConfiguration.threshold, 9)}
          </h3> */}
        </div>
      </div>
      <div className={styles.line} style={{ background: background(false) }} />
      <div className={styles.tableHeading}>
        <p>Voter</p>
        <p>Vote</p>
      </div>
      {data?.proposals[id - 1].unsupportVotes.map((item) => (
        <VoteListItem item={item} />
      ))}
      <p onClick={() => setOpen(!open)} className={styles.viewAllVoters}>
        View all voters
      </p>
    </div>
  )
}

export default ProposalVotingCard
