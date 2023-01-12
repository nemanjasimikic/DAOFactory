import styles from './styles.module.sass'
import { useForm } from 'react-hook-form'
import { validator, whatPage, styling } from 'helpers/formValidator'
// import { ErrorMessage } from '@hookform/error-message'

const Input = ({
  validated,
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
  // errors,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    shouldUseNativeValidation: true,
  })

  function validateInput() {
    let page = whatPage(registerInput)
    if (registerInput === 'daoAddress') {
      return
    } else if (!value && registerInput !== 'ownerAddress') {
      return 'This is a required field *'
    } else if (registerInput === 'ownerAddress') {
      return validator(value, 0, registerInput, false, null)
    } else if (page === 2) {
      let voting = registerInput === 'voting' ? true : false
      return validator(value, page, hourOrDay, false, voting)
    } else if (id === 'daoSlug') {
      return validator(value, page, registerInput, false)
    } else {
      // console.log('Is validating page ?', page, hourOrDay)
      return validator(value, page, registerInput, false)
    }
  }

  function didValidate() {
    let page = whatPage(registerInput)
    if (validated != null) {
      if (page == 0 && validated[page] === true) {
        return true
      } else if (page == 1 && validated[page] === true) {
        return true
      } else if (page == 2 && validated[page] === true) {
        return true
      } else if (page == 0 && validated === true) {
        return true
      }
      return false
    }
    return false
  }

  let domainRoot = 'daobuilder.nswebdevelopment.com/dao/'
  function nonRepeat(value1) {
    // slug settings
    if (id === 'daoSlugSettings') {
      if (!value1) {
        value1 = defaultValue
      }
      if (value1.includes(' ')) {
        return value1.replace(/\s/, '')
      }
      console.log(value1)
      return value1
    }
    // slug create
    if (id === 'daoSlug') {
      if (!value1) {
        value1 = defaultValue
      }
      if (!value1 || value1 === '') {
        return domainRoot
      }
      if (value1.includes(domainRoot)) {
        return value1.replace(/\s/, '')
      }
      return domainRoot
    }
  }

  const validateInputTest = (registerInput) => {
    return !registerInput ? false : true
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
        name={`${registerInput}`}
        id={registerInput}
        form={formId}
        className={styles.input}
        defaultValue={defaultValue}
        value={registerInput === 'daoSlug' ? nonRepeat(value) : value}
        type={type}
        placeholder={placeholder}
        {...register(registerInput, {
          required: 'Input field required',
          validate: validateInputTest(registerInput),
        })}
        onChange={onChange}
        disabled={disabled}
      />
      {buttons}
      <span
        style={{
          position: styling(registerInput, 'position'),
          bottom: styling(registerInput, 'bottom'),
          marginTop: styling(registerInput, 'marginT'),
          marginBottom: styling(registerInput, 'marginB'),
          color: 'red',
          fontSize: '14px',
        }}
      >
        {/* {shouldShow ? validateInput() : ''} */}
        {(console.log('errors', errors), (<div className="error">Error.</div>))}
      </span>
    </div>
  )
}

export default Input
