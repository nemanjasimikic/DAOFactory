import styles from './styles.module.sass'

const Day = ({ day, date }) => {
  return (
    <div className={styles.singleDay}>
      <p className={styles.day}>day</p>
      <p className={styles.date}>date</p>
    </div>
  )
}

const Timeline = () => {
  return (
    <div className={styles.timeline}>
      <div className={styles.monthRow}>
        <p className={styles.month}>November</p>
        <p className={styles.month}>December</p>
      </div>
      <div className={styles.dayRow}>
        <Day />
        <Day />
        <Day />
        <Day />
        <Day />
        <Day />
        <Day />
        <Day />
        <Day />
        <Day />
      </div>
      <div className={styles.timelineRow}></div>
    </div>
  )
}

export default Timeline
