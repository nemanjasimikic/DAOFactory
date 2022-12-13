import styles from './styles.module.sass'

const CreateDaoInfo = ({ page, formData }) => {
  function calculateDays(what) {
    let pending = parseInt(
      formData.pending
        ? formData.pendingTime == 'Days'
          ? formData.pending * 24
          : formData.pending
        : '0'
    )
    let queued = parseInt(
      formData.queued
        ? formData.queuedTime == 'Days'
          ? formData.queued * 24
          : formData.queued
        : '0'
    )
    let voting = parseInt(
      formData.voting
        ? formData.votingTime == 'Days'
          ? formData.voting * 24
          : formData.voting
        : '0'
    )
    let execution = parseInt(
      formData.execution
        ? formData.executionTime == 'Days'
          ? formData.execution * 24
          : formData.execution
        : '0'
    )
    let sum = pending + queued + voting + execution
    // Save the total amount of hours in the form for later use in deploying the contract
    formData.totalTime = sum
    // console.log('TOTAL in FORM: ', formData.totalTime)

    let toReturn =
      what == 'days'
        ? Math.floor(sum / 24)
        : Math.ceil(sum - Math.floor(sum / 24) * 24)
    return toReturn
  }

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.section}>
          <h3>DAO name</h3>
          <p className={styles.link}>{formData.daoSlug}</p>
        </div>
        <div className={styles.section}>
          <div className={styles.sectionRow}>
            <p className={styles.name}>Governance token</p>
            <p className={styles.value}>LOL</p>
          </div>
          <div className={styles.sectionRow}>
            <p className={styles.name}>
              Required amount for creating <br /> a proposal
            </p>
            <p className={styles.value}>
              {formData.minStake == 0 ? 0 : formData.minStake} LOL
            </p>
          </div>
        </div>
        {page > 0 && (
          <div className={styles.section}>
            <div className={styles.sectionRow}>
              <p className={styles.name}>Quorum</p>
              <p className={styles.value}>{formData.quorum}%</p>
            </div>
            <div className={styles.sectionRow}>
              <p className={styles.name}>Threshold</p>
              <p className={styles.value}>{formData.threshold} LOL</p>
            </div>
          </div>
        )}
        {page > 1 && (
          <div className={styles.section}>
            <div className={styles.sectionRow}>
              <p className={styles.name}>Proposal duration</p>
              <p className={styles.value}>
                {calculateDays('days')} days {Math.ceil(calculateDays(''))}{' '}
                hours
              </p>
            </div>
            <div className={styles.graphic}>
              <div className={styles.time}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CreateDaoInfo
