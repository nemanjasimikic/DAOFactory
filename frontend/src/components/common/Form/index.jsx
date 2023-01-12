import FormHeading from './FormHeading'
import styles from './styles.module.sass'

import { useForm } from 'react-hook-form'

const Form = ({
  id,
  children,
  heading,
  // handleSubmit,
  formData,
  // errors,
  onSubmit,
}) => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm()

  console.log('Errors in form: ', errors)

  return (
    <form
      id={id}
      onSubmit={handleSubmit((data) => onSubmit(data))}
      className={styles.form}
    >
      <FormHeading heading={heading} />
      {children}
    </form>
  )
}

export default Form
