import styles from './styles.module.sass'
import dayjs from 'dayjs'

const Day = ({ day, date, endTime, status }) => {
  let background = null
  let timeNow = dayjs().valueOf()
  let timeNowFormatted = dayjs(timeNow).format('D.M')

  // For testing
  // timeNow = dayjs('14 Feb 2023 14:02').valueOf()
  // timeNowFormatted = dayjs(timeNow).format('D.M')
  // status = 'Active'
  //

  if (
    timeNow < dayjs(endTime).valueOf() &&
    status != 'Failed' &&
    status != 'Canceled' &&
    status != 'Expired'
  ) {
    background =
      timeNowFormatted === date
        ? 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.16) 100%)'
        : null
  }

  return (
    <div style={{ background: background }} className={styles.singleDay}>
      <p className={styles.day}>{day}</p>
      <p className={styles.date}>{date}</p>
    </div>
  )
}

const Timeline = ({ data, id, timelinePeriodsList, status }) => {
  let timelineDays = []
  let timelineInMS = hoursToMS(timelinePeriodsList)
  let startTime = dayjs(data?.proposals[id].startTime).format(
    'DD MMM YYYY HH:mm'
  )
  let endTime = dayjs(
    dayjs(data?.proposals[id].startTime).valueOf() + timelineInMS
  ).format('DD MMM YYYY HH:mm')
  let timeNow = dayjs().format('DD MMM YYYY HH:mm')

  data?.proposals[id].timeline.forEach((item, index) => {
    timelineDays.push(
      <Day
        key={index}
        day={item.weekday}
        date={item.date}
        endTime={endTime}
        status={status}
      />
    )
  })

  function calculateTimelineSectionsWidth(num) {
    if (isNaN(num)) {
      return '25%'
    }
    let total =
      timelinePeriodsList[0] +
      timelinePeriodsList[1] +
      timelinePeriodsList[2] +
      timelinePeriodsList[3]
    return (num / total) * 100 + '%'
  }

  function hoursToMS(timelinePeriodsList) {
    if (data?.proposals[id].startTime && timelinePeriodsList[0]) {
      let total =
        (timelinePeriodsList[0] +
          timelinePeriodsList[1] +
          timelinePeriodsList[2] +
          timelinePeriodsList[3]) *
        3600000
      return total
    }
    return 0
  }

  const timelineHandPosition = (status0) => {
    // Testing
    // status0 = 'Active'
    if (status0 === 'Failed' || status0 === 'Expired') {
      return 100
    }
    if (status0 === 'Canceled') {
      return 0
    }
    let start = dayjs(startTime).valueOf()
    let end = dayjs(endTime).valueOf()
    let now = dayjs(timeNow).valueOf()
    //test
    // now = dayjs('14 Feb 2023 19:02').valueOf()
    let total = end - start
    let nowFromTotal = now - start
    let percent = (nowFromTotal / total) * 100
    return percent ? (percent < 0 ? 0 : percent > 100 ? 100 : percent) : 0
  }

  return (
    <div className={styles.timeline}>
      <div className={styles.monthRow}>
        <p className={styles.month}>{data?.proposals[id].month}</p>
      </div>
      <div className={styles.dayRow}>
        {data?.proposals[id].dayDifference == 0 ? (
          <Day
            day={data?.proposals[id].dayForTimeline}
            date={data?.proposals[id].dateShort}
          />
        ) : (
          timelineDays
        )}
      </div>
      <div className={styles.timelineRowWrapper}>
        <div
          className={styles.timelineHand}
          style={{ marginLeft: `${timelineHandPosition(status)}` + '%' }}
        >
          <div></div>
        </div>

        <div className={styles.timelineRow}>
          <div
            className={styles.pendingRow}
            style={{
              width: calculateTimelineSectionsWidth(timelinePeriodsList[0]),
            }}
          >
            <div></div>
            <p>Pending</p>
          </div>
          <div
            className={styles.votingRow}
            style={{
              width: calculateTimelineSectionsWidth(timelinePeriodsList[1]),
            }}
          >
            <div></div>
            <p>Voting</p>
          </div>
          <div
            className={styles.queuedRow}
            style={{
              width: calculateTimelineSectionsWidth(timelinePeriodsList[2]),
            }}
          >
            <div></div>
            <p>Queued</p>
          </div>
          <div
            className={styles.executionRow}
            style={{
              width: calculateTimelineSectionsWidth(timelinePeriodsList[3]),
            }}
          >
            <div></div>
            <p>Execution</p>
          </div>
        </div>
        <div className={styles.greyRow}></div>
      </div>
    </div>
  )
}

export default Timeline
