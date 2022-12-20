import Input from 'components/common/Input'
import styles from './styles.module.sass'
import { useForm } from 'react-hook-form'

const ProposalTimeline = ({ formData, setFormData }) => {
  const { register } = useForm()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onReset = () => {
    setFormData((prevState) => ({
      ...prevState,
      pending: 48,
      pendingTime: 'Hours',
      queued: 48,
      queuedTime: 'Hours',
      voting: 72,
      votingTime: 'Hours',
      execution: 48,
      executionTime: 'Hours',
      totalTime: 216,
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
          value={formData.pending}
        />
        <select
          id="pendingTime"
          {...register('pendingTime')}
          value={formData.pendingTime}
          onChange={onChange}
        >
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
          value={formData.queued}
        />
        <select
          id="queuedTime"
          {...register('queuedTime')}
          value={formData.queuedTime}
          onChange={onChange}
        >
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
          value={formData.voting}
        />
        <select
          id="votingTime"
          {...register('votingTime')}
          value={formData.votingTime}
          onChange={onChange}
        >
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
          value={formData.execution}
        />
        <select
          className={styles.selectOption}
          id="executionTime"
          {...register('executionTime')}
          value={formData.executionTime}
          onChange={onChange}
        >
          <option>Hours</option>
          <option>Days</option>
        </select>
      </div>
      <label onClick={onReset}>Reset timeline</label>
    </div>
  )
}

export default ProposalTimeline
