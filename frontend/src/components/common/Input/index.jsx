import styles from './styles.module.sass'
import { useForm } from 'react-hook-form'
import linkIcon from 'static/svg/linkIcon.svg'
import {
  inputValidator,
  whatPage,
  inputErrorSwitchStyle,
} from 'helpers/formValidator'
import Tooltip from 'components/common/Tooltip'

const Input = ({
  originalSlug,
  formData,
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
      return inputValidator(value, 0, registerInput, false, null)
    } else if (registerInput === 'threshold') {
      // console.log('DID VALIDATE THRESHOLD: ', formData.minStake)
      return inputValidator(
        value,
        page,
        registerInput,
        false,
        formData.minStake
      )
    } else if (page === 2) {
      let voting = registerInput === 'voting' ? true : false
      return inputValidator(value, page, hourOrDay, false, voting)
    } else if (id === 'daoSlug') {
      return inputValidator(
        value,
        page,
        registerInput,
        false,
        formData,
        originalSlug
      )
    } else {
      return inputValidator(value, page, registerInput, false)
    }
  }

  function didValidate() {
    // console.log('DID VALIDATE: ', validated)
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
        className={styles.input}
        value={
          // registerInput === 'daoSlug' ? nonRepeat(value) :
          value
        }
        type={type}
        placeholder={placeholder}
        {...register(registerInput)}
        onChange={onChange}
        disabled={disabled}
      />
      {buttons}
      <span
        style={{
          position: inputErrorSwitchStyle(registerInput, 'position'),
          bottom: inputErrorSwitchStyle(registerInput, 'bottom'),
          marginTop: inputErrorSwitchStyle(registerInput, 'marginT'),
          marginBottom: inputErrorSwitchStyle(registerInput, 'marginB'),
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
