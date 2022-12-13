import Input from 'components/common/Input'
import styles from './styles.module.sass'
import copy from 'static/svg/copy.svg'
import reloadIcon from 'static/svg/reloadIcon.svg'
import infoIcon from 'static/svg/infoIcon.svg'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const GeneralInformation = ({ formData, setFormData, rootAddress }) => {
  const { register } = useForm()
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const { daoAddress, name, daoSlug, governanceToken, minStake, description } =
    formData
  // console.log(daoAddress)

  return (
    <div className={styles.container}>
      <Input
        id="daoAddress"
        label={'Dao Address'}
        placeholder={'DAO Address'}
        registerInput={'daoAddress'}
        firstImage={reloadIcon}
        secondImage={copy}
        onChange={onChange}
        value={rootAddress}
      />
      <Input
        id="name"
        label={'Project name'}
        placeholder={'Name'}
        registerInput={'name'}
        onChange={onChange}
        value={name}
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
        onChange={onChange}
        value={governanceToken}
      />
      <Input
        id="minStake"
        label={'Min stake for creating a proposal'}
        placeholder={'0'}
        registerInput={'minStake'}
        onChange={onChange}
        value={minStake}
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
