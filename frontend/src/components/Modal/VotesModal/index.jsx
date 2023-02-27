import Modal from 'components/Modal'
import styles from './styles.module.sass'
import walletAvatar from 'static/svg/walletAvatar.svg'
import { addressFormat } from 'helpers/addressFormat'

const VotesListItem = ({ data, id }) => {
  let supportVotes = []
  data?.proposals[id - 1].supportVotes.forEach((item, index) => {
    supportVotes.push(<p className={styles.value}>{item.vote}</p>)
  })

  let addresses = []
  data?.proposals[id - 1].supportVotes.forEach((item, index) => {
    addresses.push(<p className={styles.name}>{addressFormat(item.voter)}</p>)
  })

  return (
    <div className={styles.listItem}>
      <div className={styles.nameWrapper}>
        <img src={walletAvatar} alt={'avatar'} />
        <div className={styles.info}>
          {addresses}
          {/*<p>Value</p>*/}
        </div>
      </div>
      <div className={styles.valueWrapper}>
        {supportVotes}
        {/* <p className={styles.percentage}>13.14%</p> */}
      </div>
    </div>
  )
}

const VotesModal = ({ open, setOpen, data, id }) => {
  const background = 0
    ? 'rgba(255, 255, 255, 0.08)'
    : `linear-gradient(to right, #4AB44A 0%, #4AB44A 20%, #EB4361 20%, #EB4361 100%)`

  return (
    <Modal
      title={`For - ${data?.proposals[id - 1].proposalVoteWeigth}%`}
      open={open}
      setOpen={setOpen}
    >
      <div className={styles.progressRow}>
        <div className={styles.stats}>
          <p className={styles.voteStatus}>For</p>
          <div className={styles.voteResult}>
            <p className={styles.voteCurrentResult}>
              {data?.proposals[id - 1].forVotes}
            </p>
            <p
              className={styles.voteMax}
            >{`of ${data?.proposalConfiguration.threshold}`}</p>
          </div>
        </div>
        <div
          className={styles.progressBar}
          style={{ background: background }}
        />
        <div className={styles.listHeading}>
          <p>Voter</p>
          <p>Vote</p>
        </div>
        <VotesListItem data={data} id={id} />
      </div>
    </Modal>
  )
}

export default VotesModal
