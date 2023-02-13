import styles from './styles.module.sass'

const FormHeading = ({ heading }) => {
  return heading === 'Treasury' ? (
    <div className={styles.headingContainer}>
      <h2 className={styles.formHeading}>{heading}</h2>
      <p>Optional</p>
    </div>
  ) : (
    <h2 className={styles.formHeading}>{heading}</h2>
  )
}

export default FormHeading
