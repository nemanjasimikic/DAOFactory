import styles from './styles.module.sass'
import { useForm } from 'react-hook-form'
import { validator, whatPage, styling } from 'helpers/formValidator'

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
}) => {
  const {
    register,
    formState: { errors },
  } = useForm({
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
    console.log(value1, defaultValue)
    // slug settings
    if (id === 'daoSlug1') {
      if (!value1) {
        value1 = defaultValue
      }
      if (value1.includes(' ')) {
        console.log('ssss', value1)
        return value1.replace(/\s/, '')
      }
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
        console.log('ssss', value1)
        return value1.replace(/\s/, '')
      }
      return domainRoot
    }
  }

  let shouldShow = didValidate()

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
        className={styles.input}
        defaultValue={defaultValue}
        value={registerInput === 'daoSlug' ? nonRepeat(value) : value}
        // value={
        //   registerInput === 'daoSlug'
        //     ? 'daobuilder.nswebdevelopment.com/dao/'
        //     : value
        // }
        type={type}
        placeholder={placeholder}
        {...register(registerInput)}
        onChange={onChange}
        // onChange={registerInput === 'daoSlug' ? nonRepeat(value) : onChange}
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
        {shouldShow ? validateInput() : ''}
      </span>
    </div>
  )
}

export default Input
