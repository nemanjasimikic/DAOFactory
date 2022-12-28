import styles from './styles.module.sass'
import { useForm } from 'react-hook-form'
import { validator, whatPage } from 'helpers/formValidator'

const Input = ({
  id,
  formId,
  buttons,
  label,
  placeholder,
  value,
  registerInput,
  type,
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
    } else if (registerInput === 'ownerAddress') {
      return validator(value, 0, registerInput, false, null)
    }
    else if (page === 2) {
      let voting = registerInput === 'voting' ? true : false
      return validator(value, page, hourOrDay, false, voting)
    } else {
      // let page0 = registerInput === 'ownerAddress' ? 0 : page
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

  let domainRoot = 'daobuilder.nswebdevelopment.com/dao/'
  function nonRepeat(value) { 

    console.log('DefaultSlug:', defaultValue)
    console.log('SlugValue:', value)

    if (id != 'daoSlug1' && !value) {
      console.log('Triggered value to def value')
      value = defaultValue
      return value
    } 


    if (id === 'daoSlug') {
      if (!value) {
        return domainRoot
      } else if (value.includes(domainRoot)) {
        return value
      } else {
        return domainRoot
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
        style={{
          paddingRight: `${buttons?.length * 31}px`,
          paddingLeft: '10px',
        }}
        id={registerInput}
        form={formId}
        required={required}
        className={styles.input}
        defaultValue={defaultValue}
        value={registerInput === 'daoSlug' ? nonRepeat(value) : value}
        // value={value}
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
