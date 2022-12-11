import Input from 'components/common/Input'
import styles from './styles.module.sass'

const ProposalTimeline = ({ formData, setFormData }) => {
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className={styles.container}>
      <div className={styles.selectWrapper}>
        <Input
          id="pending"
          label={'Pending'}
          registerInput={'pending'}
          onChange={onChange}
        />
        <select>
          <option>Hours</option>
          <option>Days</option>
        </select>
      </div>
      <div className={styles.selectWrapper}>
        <Input
          id="queued"
          label={'Queued'}
          registerInput={'queued'}
          onChange={onChange}
        />
        <select>
          <option>Hours</option>
          <option>Days</option>
        </select>
      </div>
      <div className={styles.selectWrapper}>
        <Input
          id="voting"
          label={'Voting'}
          registerInput={'voting'}
          onChange={onChange}
        />
        <select>
          <option>Hours</option>
          <option>Days</option>
        </select>
      </div>
      <div className={styles.selectWrapper}>
        <Input
          id="execution"
          label={'Execution'}
          registerInput={'execution'}
          onChange={onChange}
        />
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
