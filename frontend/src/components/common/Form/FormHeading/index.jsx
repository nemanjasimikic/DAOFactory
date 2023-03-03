import styles from './styles.module.sass'

const FormHeading = ({ heading }) => {
  return heading === 'Treasury' ? (
    <div className={styles.headingContainer}>
      <h2 className={styles.formHeading}>{heading}</h2>
      <p style={{color: 'rgba(255, 255, 255, 0.48)'}}>Optional</p>
    </div>
  ) : (
    <h2 className={styles.formHeading}>{heading}</h2>
  )
}

export default FormHeading
