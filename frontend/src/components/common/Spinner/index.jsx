import styles from './styles.module.sass'

const Spinner = () => {
  return (
    <div className={styles.loadingSpinnerContainer}>
      <div className={styles.loadingSpinner} />
    </div>
  )
}

export default Spinner
