import styles from './styles.module.sass'

const Select = ({ label, options, value }) => {
  return (
    <div className={styles.selectContainer}>
      <label className={styles.label}>{label}</label>
      <div className={styles.selectWrapper}>
        {/*{value}*/}
        <ul className={`${styles.options} ${styles.show}`}>
          {options.map((option) => (
            <li className={styles.option} key={option.value}>
              {option.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Select
