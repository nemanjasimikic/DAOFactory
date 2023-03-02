import styles from './styles.module.sass'
import { useForm } from 'react-hook-form'
import linkIcon from 'static/svg/linkIcon.svg'
import { validator, whatPage, styling } from 'helpers/formValidator'
import Tooltip from 'components/common/Tooltip'

const Input = ({
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
  validated,
  id,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // shouldUseNativeValidation: true,
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

  let shouldShow = didValidate()

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

  let hint =
    registerInput === 'governanceToken'
      ? 'You can find the addresses on everscan.io/tokens'
      : null

  let icon = (
    <img
      title=""
      src={labelIcon}
      className={styles.labelIcon}
      onError={(event) => (event.target.src = '')}
    />
  )

  return (
    <div className={styles.inputWrapper}>
      {registerInput === 'governanceToken' ? (
        <div className={styles.labelWrapper}>
          <div className={styles.labelInnerWrap}>
            <label className={styles.label}>{label}</label>
            <Tooltip
              label={'Governance Token'}
              text={'You can find the addresses on everscan.io/tokens'}
              wrappedElement={icon}
            ></Tooltip>
          </div>
          <div>
            <a
              className={styles.labelInnerWrap2}
              target="_blank"
              href="https://app.flatqube.io/builder/create"
            >
              <div>Create token</div>
              <img src={linkIcon} alt={'link icon'} />
            </a>
          </div>
        </div>
      ) : (
        <div className={styles.labelWrapper}>
          <label className={styles.label}>{label}</label>
          <img
            title={hint}
            src={labelIcon}
            className={styles.labelIcon}
            onError={(event) => (event.target.src = '')}
          />
        </div>
      )}
      <input
        style={{
          paddingRight: `${buttons?.length * 31}px`,
          paddingLeft: '10px',
        }}
        id={registerInput}
        form={formId}
        // required={required}
        className={styles.input}
        defaultValue={defaultValue}
        value={registerInput === 'daoSlug' ? nonRepeat(value) : value}
        // value={value}
        type={type}
        placeholder={placeholder}
        {...register(registerInput, {
          required: 'Input field required',
          validate: validateInputTest(registerInput),
        })}
        // {...register(registerInput, { required: 'This is required' })}
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
