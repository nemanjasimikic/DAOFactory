import styles from './styles.module.sass'
import { useForm } from 'react-hook-form'
import linkIcon from 'static/svg/linkIcon.svg'
import { validator, whatPage } from 'helpers/formValidator'

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

  let hint =
    registerInput === 'governanceToken'
      ? 'Token used for voting on a given proposal'
      : null

  return (
    <div className={styles.inputWrapper}>
      {registerInput === 'governanceToken' ? (
        <div className={styles.labelWrapper}>
          <div className={styles.labelInnerWrap}>
            <label className={styles.label}>{label}</label>
            <img
              title={hint}
              src={labelIcon}
              className={styles.labelIcon}
              onError={(event) => (event.target.src = '')}
            />
          </div>
          <div>
            <a
              className={styles.labelInnerWrap2}
              target="_blank"
              href="https://app.flatqube.io/builder/"
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
        required={required}
        className={styles.input}
        defaultValue={defaultValue}
        value={value}
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
        {/*validateInput()*/}
      </span>
    </div>
  )
}

export default Input
