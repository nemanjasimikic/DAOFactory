import styles from './styles.module.sass'
import infoIcon from 'static/svg/infoIcon.svg'
import Input from 'components/common/Input'

const VotingConfiguration = () => {
  return (
    <div className={styles.container}>
      <div className={styles.infoWrapper}>
        <span>Quorum</span>
        <img src={infoIcon} alt={'info'} />
      </div>
      <input type={'range'} min={1} max={100} className={styles.slider} />
      <div className={styles.infoWrapper}>
        <span>Threshold</span>
        <img src={infoIcon} alt={'info'} />
      </div>
      <Input defaultValue={0} registerInput={'threshold'} />
    </div>
  )
}

export default VotingConfiguration
