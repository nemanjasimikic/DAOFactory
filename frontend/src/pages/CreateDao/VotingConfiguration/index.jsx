import styles from './styles.module.sass'
import infoIcon from 'static/svg/infoIcon.svg'
import Input from 'components/common/Input'
import Tooltip from 'components/common/Tooltip'

const VotingConfiguration = ({ formData, setFormData }) => {
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  let icon1 = (
    <img
      src={infoIcon}
      alt={'info'}
      // title={
      //   'Minimum level of participation required for a proposal to be valid'
      // }
    />
  )

  let icon2 = (
    <img
      src={infoIcon}
      alt={'info'}
      // title={'Minimum number of "yes" votes for a proposal to be accepted'}
    />
  )

  return (
    <div className={styles.container}>
      <div className={styles.infoWrapper}>
        <span>Quorum</span>
        <Tooltip
          wrappedElement={icon1}
          label={'Quorum'}
          text={
            'Minimum level of participation required for a proposal to be valid'
          }
        ></Tooltip>
      </div>
      <div className={styles.percentileContainer}>
        <div
          style={{
            width: '92%',
            transform: `translateX(${formData.quorum}%)`,
          }}
        >
          {formData.quorum}%
        </div>
      </div>
      <input
        style={{ background: `linear-gradient(to right, 
          rgba(255, 255, 255, 0.86) 0%, 
          rgba(255, 255, 255, 0.86) ${formData.quorum}%, 
          rgba(255, 255, 255, 0.26) ${formData.quorum}%,
          rgba(255, 255, 255, 0.26) 100%)` }}
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
        <Tooltip
          wrappedElement={icon2}
          label={'Threshold'}
          text={'Minimum number of "yes" votes for a proposal to be accepted'}
        ></Tooltip>
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
