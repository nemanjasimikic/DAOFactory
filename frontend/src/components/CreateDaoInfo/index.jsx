import styles from './styles.module.sass'

const CreateDaoInfo = ({ page, formData }) => {
  // Calculate days and hours funk
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
    let toReturn =
      what == 'days'
        ? Math.floor(sum / 24)
        : Math.ceil(sum - Math.floor(sum / 24) * 24)
    return toReturn
  }

  //TODO:
  const iconLogo = formData.token ? (
    <img
      src={formData.icon !== '' ? formData.icon : '/5.svg'}
      width="20"
      height="20"
      style={{ marginBottom: '-4px' }}
    />
  ) : null
  function calculateTimelineWidth(line, format) {
    let total = formData.totalTime
    let modifier = format == 'Days' ? 24 : 1
    if (line == 1) {
      return ((formData.pending * modifier) / total) * 100 + '%'
    } else if (line == 2) {
      return ((formData.queued * modifier) / total) * 100 + '%'
    } else if (line == 3) {
      return ((formData.voting * modifier) / total) * 100 + '%'
    } else {
      return ((formData.execution * modifier) / total) * 100 + '%'
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.section}>
          <h3>{formData.name == '' ? 'DAO Name' : formData.name}</h3>
          <p className={styles.link}>
            daobuilder.nswebdevelopment.com/dao/{formData.daoSlug}
          </p>
        </div>
        <div className={styles.section}>
          <div className={styles.sectionRow}>
            <p className={styles.name}>Governance token</p>
            <p className={styles.value}>
              {iconLogo} {formData.token}
            </p>
          </div>
          <div className={styles.sectionRow}>
            <p className={styles.name}>
              Required amount for creating <br /> a proposal
            </p>
            <p className={styles.value}>
              {formData.minStake == 0 ? 0 : formData.minStake} {formData.token}
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
              <p className={styles.value}>
                {formData.threshold} {formData.token}
              </p>
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
              <div className={styles.time}>
                <div
                  style={{
                    width: calculateTimelineWidth(1, formData.pendingTime),
                  }}
                >
                  <p>
                    {formData.pending}{' '}
                    {formData.pendingTime === 'Days' ? 'd' : 'h'}
                  </p>
                  <hr className={styles.line1} />
                </div>
                <div
                  style={{
                    width: calculateTimelineWidth(2, formData.queuedTime),
                  }}
                >
                  <p>
                    {formData.queued}{' '}
                    {formData.queuedTime === 'Days' ? 'd' : 'h'}
                  </p>
                  <hr className={styles.line2} />
                </div>
                <div
                  style={{
                    width: calculateTimelineWidth(3, formData.votingTime),
                  }}
                >
                  <p>
                    {formData.voting}{' '}
                    {formData.votingTime === 'Days' ? 'd' : 'h'}
                  </p>
                  <hr className={styles.line3} />
                </div>
                <div
                  style={{
                    width: calculateTimelineWidth(4, formData.executionTime),
                  }}
                >
                  <p>
                    {formData.execution}{' '}
                    {formData.executionTime === 'Days' ? 'd' : 'h'}
                  </p>
                  <hr className={styles.line4} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CreateDaoInfo
