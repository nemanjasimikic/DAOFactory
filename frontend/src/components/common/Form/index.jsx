import FormHeading from './FormHeading'
import styles from './styles.module.sass'

const Form = ({ children, heading }) => {
  return (
    <form className={styles.form}>
      <FormHeading heading={heading} />
      {children}
    </form>
  )
}

export default Form
