import styles from './styles.module.sass'
import { useForm } from 'react-hook-form'

const Treasury = ({ formData, setFormData }) => {
  const { register } = useForm()
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  return (
    <div className={styles.container}>
      <p>
        First of all, users will recognize the DAO by this name. Note, this
        parameter will not be available for editing.
      </p>
      <label>
        Create DAO Treasury
        <input
          id="treasury"
          type={'checkbox'}
          {...register('treasury')}
          onChange={onChange}
        />
        <span className={styles.checkmark} />
      </label>
    </div>
  )
}

export default Treasury
