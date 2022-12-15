import styles from './styles.module.sass'
import { useForm } from 'react-hook-form'
import { validator } from 'store/features/daoSlice'

const Input = ({
  label,
  placeholder,
  value,
  registerInput,
  type,
  firstImage,
  secondImage,
  labelIcon,
  onChange,
  defaultValue,
  disabled,
  required,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    shouldUseNativeValidation: true,
  })

  const validatorMain = () => {
    // return value ? null : 'This is a required field *'
    if (!value) {
      return 'This is a required field *'
    } else if (registerInput == 'governanceToken') {
      if (validator(value)) {
        return null
      } else {
        return validator(value)
      }
    }
  }

  // console.log(`error ${registerInput}`, errors)

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.labelWrapper}>
        <label className={styles.label}>{label}</label>
        <img
          src={labelIcon}
          className={styles.labelIcon}
          onError={(event) => (event.target.src = '')}
        />
      </div>
      <input
        required={required}
        className={styles.input}
        value={value}
        defaultValue={defaultValue}
        type={type}
        placeholder={placeholder}
        {...register(registerInput)}
        onChange={onChange}
        disabled={disabled}
      />
      <img
        src={firstImage}
        onError={(event) => (event.target.src = '')}
        className={styles.inputIconOne}
      />
      <img
        src={secondImage}
        onError={(event) => (event.target.src = '')}
        className={styles.inputIconTwo}
      />
      <span>{validatorMain()}</span>
    </div>
  )
}

export default Input
