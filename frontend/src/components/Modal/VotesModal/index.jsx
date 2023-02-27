import Modal from 'components/Modal'
import styles from './styles.module.sass'
import walletAvatar from 'static/svg/walletAvatar.svg'

const VotesListItem = () => {
  return (
    <div className={styles.listItem}>
      <div className={styles.nameWrapper}>
        <img src={walletAvatar} alt={'avatar'} />
        <div className={styles.info}>
          <p className={styles.name}>Name</p>
          {/*<p>Value</p>*/}
        </div>
      </div>
      <div className={styles.valueWrapper}>
        <p className={styles.value}>123000</p>
        <p className={styles.percentage}>13.14%</p>
      </div>
    </div>
  )
}

const VotesModal = ({ open, setOpen }) => {
  const background = 0
    ? 'rgba(255, 255, 255, 0.08)'
    : `linear-gradient(to right, #4AB44A 0%, #4AB44A 20%, #EB4361 20%, #EB4361 100%)`

  return (
    <Modal title={'For - 84.76%'} open={open} setOpen={setOpen}>
      <div className={styles.progressRow}>
        <div className={styles.stats}>
          <p className={styles.voteStatus}>For</p>
          <div className={styles.voteResult}>
            <p className={styles.voteCurrentResult}>847</p>
            <p className={styles.voteMax}> of 1000000</p>
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
        <VotesListItem />
      </div>
    </Modal>
  )
}

export default VotesModal
