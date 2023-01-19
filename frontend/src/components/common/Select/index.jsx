import styles from './styles.module.sass'

const Select = ({ label, options }) => {
  return (
    <div className={styles.selectWrapper}>
      <label className={styles.label}>{label}</label>
      {/*<div className={styles.customSelect}>*/}
      <select>
        {options.map((option) => (
          <option>{option}</option>
        ))}
      </select>
      {/*</div>*/}
    </div>
  )
}

export default Select
