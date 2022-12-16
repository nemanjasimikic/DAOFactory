import styles from './styles.module.sass'
import infoIcon from 'static/svg/infoIcon.svg'
import Input from 'components/common/Input'

const VotingConfiguration = ({ formData, setFormData }) => {
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  return (
    <div className={styles.container}>
      <div className={styles.infoWrapper}>
        <span>Quorum</span>
        <img src={infoIcon} alt={'info'} />
      </div>
      <input
        name="quorum"
        type={'range'}
        min={1}
        max={100}
        className={styles.slider}
        onChange={onChange}
        registerInput="quorum"
        value={formData.quorum}
      />
      <div className={styles.infoWrapper}>
        <span>Threshold</span>
        <img src={infoIcon} alt={'info'} />
      </div>
      <Input
        id="threshold"
        defaultValue={0}
        registerInput={'threshold'}
        onChange={onChange}
        value={formData.threshold}
      />
    </div>
  )
}

export default VotingConfiguration
