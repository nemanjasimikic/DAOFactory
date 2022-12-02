import styles from './styles.module.sass'

const Treasury = () => {
  return (
    <div className={styles.container}>
      <p>
        First of all, users will recognize the DAO by this name. Note, this
        parameter will not be available for editing.
      </p>
      <label>
        Create DAO Treasury
        <input type={'checkbox'} />
        <span className={styles.checkmark} />
      </label>
    </div>
  )
}

export default Treasury
