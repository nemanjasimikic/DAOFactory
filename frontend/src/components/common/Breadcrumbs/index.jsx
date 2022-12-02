import styles from './styles.module.sass'

const Breadcrumbs = ({ page }) => {
  const getClassStepOne =
    page === 0 ? styles.activeClass : page > 0 ? styles.passedClass : ''

  const getClassStepTwo =
    page === 1
      ? styles.activeClass
      : page < 1
      ? styles.inactiveClass
      : styles.passedClass

  const getClassStepThree =
    page === 2
      ? styles.activeClass
      : page < 2
      ? styles.inactiveClass
      : styles.passedClass

  const getClassStepFour =
    page === 3
      ? styles.activeClass
      : page < 3
      ? styles.inactiveClass
      : styles.activeClass

  return (
    <ul className={styles.breadcrumbs}>
      <div className={styles.linkWrapper}>
        <li className={getClassStepOne}>
          <p className={getClassStepOne}>1</p>
        </li>
        <p className={getClassStepOne}>General information</p>
      </div>
      <div className={styles.linkWrapper}>
        <li className={getClassStepTwo}>
          <p className={getClassStepTwo}>2</p>
        </li>
        <p className={getClassStepTwo}>Voting configuration</p>
      </div>
      <div className={styles.linkWrapper}>
        <li className={getClassStepThree}>
          <p className={getClassStepThree}>3</p>
        </li>
        <p className={getClassStepThree}>Proposal configuration</p>
      </div>
      <div className={styles.linkWrapper}>
        <li className={getClassStepFour}>
          <p className={getClassStepFour}>4</p>
        </li>
        <p className={getClassStepFour}>Treasury</p>
      </div>
    </ul>
  )
}

export default Breadcrumbs
