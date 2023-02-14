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
        <img
          src={infoIcon}
          alt={'info'}
          title={
            'Minimum level of participation required for a proposal to be valid'
          }
        />
      </div>
      <div className={styles.percentileContainer}>
        <div
          style={{
            width: '92%', // TODO: tbc
            transform: `translateX(${formData.quorum}%)`,
          }}
        >
          {formData.quorum}%
        </div>
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
        defaultValue={51}
      />
      <div className={styles.infoWrapper}>
        <span>Threshold</span>
        <img
          src={infoIcon}
          alt={'info'}
          title={
            'Minimum number of approvals required for the proposal to pass'
          }
        />
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
