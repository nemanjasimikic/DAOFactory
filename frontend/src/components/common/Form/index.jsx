import FormHeading from './FormHeading'
import styles from './styles.module.sass'

const Form = ({ id, children, heading, handleSubmit, formData, errors }) => {
  return (
    <form
      id={id}
      onSubmit={handleSubmit((data) => {
        console.log('form submitted data: ', formData)
        console.log('form submitted errors: ', errors)
      })}
      className={styles.form}
    >
      <FormHeading heading={heading} />
      {children}
    </form>
  )
}

export default Form
