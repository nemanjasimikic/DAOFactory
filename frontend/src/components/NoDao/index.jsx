import styles from './styles.module.sass'

const NoDao = () => {
  return (
    <div className={styles.noDao}>
      <div className={styles.noDaosAvailable}>
        <h3>It seems you haven't made any dao yet</h3>
        <p>Create your first DAO or add existing one.</p>
      </div>
    </div>
  )
}

export default NoDao
