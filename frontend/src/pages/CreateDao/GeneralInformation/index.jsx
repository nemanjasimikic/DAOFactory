import Input from 'components/common/Input'
import styles from './styles.module.sass'
import copy from 'static/svg/copy.svg'
import reloadIcon from 'static/svg/reloadIcon.svg'
import infoIcon from 'static/svg/infoIcon.svg'
import { useForm } from 'react-hook-form'
import ImageButton from 'components/common/ImageButton'
import daoService from 'store/services/daoService'
import { useState } from 'react'

const GeneralInformation = ({
  validated,
  formId,
  formData,
  setFormData,
  rootAddress,
  handleSubmit,
}) => {
  const { register } = useForm()
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const [tokenOk, isTokenOk] = useState({})

  const onAddressChange = async (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))

    const token = await daoService.getToken(e.target.value)

    setFormData((prevState) => ({
      ...prevState,
      token: token ? token.label.value0 : '',
      icon: token ? token.icon : '',
    }))
    isTokenOk(token)
  }

  const [slugOk, isSlugOk] = useState({})

  const onSlugChange = async (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
    const slugCheck = await daoService.checkSlug(e.target.value)
    isSlugOk(slugCheck.isSlugOk)
  }

  const { daoAddress, name, daoSlug, governanceToken, minStake, description } =
    formData

  // proslediti funkcije koje trebaju da se dese na klik ikonica
  async function onClickFunctionInImage1(e) {
    e.preventDefault()
    const address = await daoService.getAddressForRoot()
    rootAddress = address.rootAddress
    setFormData((prevState) => ({
      ...prevState,
      daoAddress: address.rootAddress,
      nonce: address.nonce,
    }))
  }

  function onClickFunctionInImage2(e) {
    e.preventDefault()
    navigator.clipboard.writeText(
      document.getElementsByName('daoAddress')[0].value
    )
  }

  const imageButtons = [
    <ImageButton
      image={reloadIcon}
      onClickFunction={(e) => onClickFunctionInImage1(e)}
      style={'image1'}
    />,
    <ImageButton
      image={copy}
      onClickFunction={(e) => onClickFunctionInImage2(e)}
      style={'image2'}
    />,
  ]

  return (
    <div className={styles.container}>
      <Input
        formId={formId}
        id="daoAddress"
        label={'DAO Address'}
        placeholder={'DAO Address'}
        registerInput={'daoAddress'}
        // firstImage={reloadIcon}
        // secondImage={copy}
        buttons={imageButtons}
        onChange={onChange}
        value={daoAddress !== '' ? daoAddress : rootAddress}
      />
      <Input
        validated={validated}
        id="name"
        label={'Project name'}
        placeholder={'Name'}
        registerInput={'name'}
        defaultValue={'DAO name'}
        onChange={onChange}
        value={name}
        required={true}
      />
      <Input
        formData={slugOk}
        validated={validated}
        id="daoSlug"
        label={'DAO slug'}
        placeholder={'slug'}
        registerInput={'daoSlug'}
        onChange={onSlugChange}
        defaultValue={''}
        value={daoSlug}
        required={true}
      />
      <Input
        formData={tokenOk}
        validated={validated}
        id="governanceToken"
        label={'Governance token root address'}
        placeholder={'Token address'}
        className={styles.input}
        registerInput={'governanceToken'}
        labelIcon={infoIcon}
        onChange={onAddressChange}
        value={governanceToken}
        required={true}
      />
      <Input
        validated={validated}
        id="minStake"
        label={'Min stake for creating a proposal'}
        placeholder={'0'}
        registerInput={'minStake'}
        onChange={onChange}
        value={minStake}
        required={true}
      />
      <label>Description(optional)</label>
      <textarea
        defaultValue={formData.description}
        id="description"
        className={styles.textarea}
        {...register('description')}
        onChange={onChange}
      />
    </div>
  )
}

export default GeneralInformation
