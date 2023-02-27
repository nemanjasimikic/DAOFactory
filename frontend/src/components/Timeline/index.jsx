import styles from './styles.module.sass'

const Day = ({ day, date }) => {
  return (
    <div className={styles.singleDay}>
      <p className={styles.day}>{day}</p>
      <p className={styles.date}>{date}</p>
    </div>
  )
}

const Timeline = ({ data, id }) => {
  let timelineDays = []
  // if (data != null && data.length > 0) {
  console.log('data timeline: ', data?.proposals[id].timeline)
  data?.proposals[id].timeline.forEach((item, index) => {
    timelineDays.push(<Day day={item.weekday} date={item.date} />)
  })
  console.log('timelineDays: ', timelineDays)
  //}
  return (
    <div className={styles.timeline}>
      <div className={styles.monthRow}>
        <p className={styles.month}>{data?.proposals[id].month}</p>
        {/* <p className={styles.month}>December</p> */}
      </div>
      <div className={styles.dayRow}>
        {
          data?.proposals[id].dayDifference == 0 ? (
            <Day
              day={data?.proposals[id].dayForTimeline}
              date={data?.proposals[id].dateShort}
            />
          ) : (
            // <Day />
            timelineDays
          )
          // <Day />
          // <Day />
          // <Day />
          // <Day />
          // <Day />
          // <Day />
          // <Day />
          // <Day />
          // <Day />
        }
      </div>
      <div className={styles.timelineRow}></div>
    </div>
  )
}

export default Timeline
