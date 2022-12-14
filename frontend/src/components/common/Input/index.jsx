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
  onSubmit,
}) => {
  const { register } = useForm()

  // console.log(registerInput)

  let color = 'red'

  const validatorMain = () => {
    // return value ? null : 'This is a required field *'
    if (!value) {
      return 'This is a required field *'
    } else if (registerInput == 'governanceToken') {
      if (validator(value) == true) {
        return null
      } else {
        // color = 'red'
        return validator(value)
      }
    }
  }

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
        className={styles.input}
        value={value}
        defaultValue={defaultValue}
        type={type}
        placeholder={placeholder}
        {...register(registerInput)}
        onChange={onChange}
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

      {/* <p style={{ marginTop: '-0.75rem', color: color, fontSize: '14px' }}>
        {validatorMain()}
      </p> */}
    </div>
  )
}

export default Input
