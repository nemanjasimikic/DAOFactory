import styles from './styles.module.sass'
import { useForm } from 'react-hook-form'

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
}) => {
  const { register } = useForm()

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
    </div>
  )
}

export default Input
