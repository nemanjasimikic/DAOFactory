import Input from 'components/common/Input'
import styles from './styles.module.sass'
import copy from 'static/svg/copy.svg'
import reloadIcon from 'static/svg/reloadIcon.svg'
import infoIcon from 'static/svg/infoIcon.svg'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import ImageButton from 'components/common/ImageButton'
import daoService from 'store/services/daoService'

const GeneralInformation = ({ formData, setFormData, rootAddress }) => {
  const { register } = useForm()
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onAddressChange = async (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))

    const token = await daoService.getToken(e.target.value)
    //formData.token = token.value0
    console.log('token: ', formData.token)
    setFormData((prevState) => ({
      ...prevState,
      token: token.value0,
    }))
  }

  const { daoAddress, name, daoSlug, governanceToken, minStake, description } =
    formData

  // proslediti funkcije koje trebaju da se dese na klik ikonica
  function onClickFunctionInImage1() {
    console.log('Image 1 clicked')
  }
  function onClickFunctionInImage2() {
    console.log('Image 2 clicked')
  }

  const imageButtons = [
    <ImageButton
      image={reloadIcon}
      onClickFunction={onClickFunctionInImage1}
      style={'image1'}
    />,
    <ImageButton
      image={copy}
      onClickFunction={onClickFunctionInImage2}
      style={'image2'}
    />,
  ]

  console.log('Form data: ', formData)
  return (
    <div className={styles.container}>
      <Input
        id="daoAddress"
        label={'DAO Address'}
        placeholder={'DAO Address'}
        registerInput={'daoAddress'}
        // firstImage={reloadIcon}
        // secondImage={copy}
        buttons={imageButtons}
        onChange={onChange}
        value={rootAddress}
      />
      <Input
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
        id="daoSlug"
        label={'DAO slug'}
        placeholder={'address'}
        registerInput={'daoSlug'}
        onChange={onChange}
        defaultValue={'daobuilder.io/'}
        value={daoSlug}
      />
      <Input
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
        id="description"
        className={styles.textarea}
        {...register('description')}
        onChange={onChange}
      />
    </div>
  )
}

export default GeneralInformation
