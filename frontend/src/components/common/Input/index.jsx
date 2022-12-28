import styles from './styles.module.sass'
import { useForm } from 'react-hook-form'
import { validator, whatPage } from 'helpers/formValidator'

const Input = ({
  formId,
  buttons,
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
  hourOrDay,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    shouldUseNativeValidation: true,
  })

  function validateInput() {
    let page = whatPage(registerInput)
    if (registerInput === 'daoAddress' || registerInput === 'daoSlug') {
      return
    } else if (!value) {
      // return 'This is a required field *'
      return
    } else if (page === 2) {
      let voting = registerInput === 'voting' ? true : false
      return validator(value, page, hourOrDay, false, voting)
    } else {
      return validator(value, page, registerInput, false)
    }
  }

  // To be moved to new file, and edited
  let color = 'red'
  function styling(what, param) {
    if (
      what === 'queued' ||
      what === 'pending' ||
      what === 'voting' ||
      what === 'execution'
    ) {
      if (param === 'position') {
        return 'absolute'
      } else {
        return '0'
      }
    } else {
      if (param === 'position') {
        return 'relative'
      } else if (param === 'bottom') {
        return null
      } else if (param === 'marginT') {
        return '-0.80rem'
      } else if (param === 'marginB') {
        return '0.80rem'
      }
      return 'relative'
    }
  }

  // console.log('firstimage', firstImage)
  // console.log('secondimage', buttons?.length)

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
        style={{paddingRight: `${buttons?.length * 31}px`, paddingLeft: '10px'}}
        id={registerInput}
        form={formId}
        required={required}
        className={styles.input}
        value={value}
        defaultValue={defaultValue}
        type={type}
        placeholder={placeholder}
        {...register(registerInput, { required: 'This is required' })}
        onChange={onChange}
        disabled={disabled}
      />
      {/* <img
        src={firstImage}
        onError={(event) => (event.target.src = '')}
        className={styles.inputIconOne}
      />
      <img
        src={secondImage}
        onError={(event) => (event.target.src = '')}
        className={styles.inputIconTwo}
      /> */}
      {buttons}
      <span
        style={{
          position: styling(registerInput, 'position'),
          bottom: styling(registerInput, 'bottom'),
          marginTop: styling(registerInput, 'marginT'),
          marginBottom: styling(registerInput, 'marginB'),
          color: color,
          fontSize: '14px',
        }}
      >
        {validateInput()}
      </span>
    </div>
  )
}

export default Input
