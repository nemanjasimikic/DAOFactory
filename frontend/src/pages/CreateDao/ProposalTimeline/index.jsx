import Input from 'components/common/Input'
import styles from './styles.module.sass'

const ProposalTimeline = () => {
  return (
    <div className={styles.container}>
      <div className={styles.selectWrapper}>
        <Input label={'Pending'} registerInput={'pending'} />
        <select>
          <option>Hours</option>
          <option>Days</option>
        </select>
      </div>
      <div className={styles.selectWrapper}>
        <Input label={'Queued'} registerInput={'queued'} />
        <select>
          <option>Hours</option>
          <option>Days</option>
        </select>
      </div>
      <div className={styles.selectWrapper}>
        <Input label={'Voting'} registerInput={'voting'} />
        <select>
          <option>Hours</option>
          <option>Days</option>
        </select>
      </div>
      <div className={styles.selectWrapper}>
        <Input label={'Execution'} registerInput={'execution'} />
        <select>
          <option>Hours</option>
          <option>Days</option>
        </select>
      </div>
      <label>Reset timeline</label>
    </div>
  )
}

export default ProposalTimeline
