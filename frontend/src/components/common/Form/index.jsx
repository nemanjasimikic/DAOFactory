import FormHeading from './FormHeading'
import styles from './styles.module.sass'

const Form = ({ children, heading, handleSubmit }) => {
  const onSubmit = () => {
    // async request which may result error
  }
  const onError = (errors, e) => console.log(errors, e)

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className={styles.form}>
      <FormHeading heading={heading} />
      {children}
    </form>
  )
}

export default Form
