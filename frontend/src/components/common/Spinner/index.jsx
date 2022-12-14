import styles from './styles.module.sass'

const Spinner = () => {
  return (
    <div className={styles.loadingSpinnerContainer}>
      <div className={styles.loadingSpinner}></div>
    </div>
  )
}

export default Spinner
