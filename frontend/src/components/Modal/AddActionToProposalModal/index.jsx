import { useState } from 'react'

import Modal from '../index'
import Input from 'components/common/Input'
import Button from 'components/common/Button'
import Select from 'components/common/Select'
import styles from './styles.module.sass'
import { useForm } from 'react-hook-form'

const AddActionToProposalModal = ({
  open,
  setOpen,
  formData,
  setFormData,
  addAction,
}) => {
  const type = ['Custom action', 'Simple proposal']
  const network = ['Everscale']
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const [selectedOptions, setSelectedOption] = useState(formData.typeValue)
  const [selectedNetwork, setSelectedNetwork] = useState(formData.networkValue)
  
  return (
    <Modal title={'Add action to proposal'} open={open} setOpen={setOpen}>
      <Select
        name={'Custom action'}
        label={'Type'}
        id="type"
        options={type}
        value={'Custom action'}
        registerSelect={'type'}
        onChange={onChange}
        selected={selectedOptions}
        setSelected={setSelectedOption}
      />
      <Select
        name={'Everscale'}
        label={'Network'}
        id="network"
        options={network}
        value={'Everscale'}
        registerSelect={'network'}
        onChange={onChange}
        selected={selectedNetwork}
        setSelected={setSelectedNetwork}
      />
      {/* <label className={styles.label}>Type</label> */}
      {/* <select
        className={styles.select}
        id="typeValue"
        {...register('typeValue')}
        value={formData.typeValue}
        onChange={onChange}
      >
        <option className={styles.option}>Custom action</option>
        <option className={styles.option}>Simple proposal</option>
      </select> */}
      {/* <label className={styles.label}>Network</label> */}
      {/* <select
        className={styles.select}
        id="networkValue"
        {...register('networkValue')}
        value={formData.networkValue}
        onChange={onChange}
      >
        <option>Everscale</option>
      </select> */}
      <Input
        label={'Target contract address'}
        registerInput={'target_contract_address'}
        value={formData.target_contract_address}
        onChange={onChange}
      />
      <Input
        label={'Payload'}
        registerInput={'payload'}
        value={formData.payload}
        onChange={onChange}
      />
      <Input
        label={'Attached value, TON'}
        registerInput={'attached_value'}
        value={formData.attached_value}
        onChange={onChange}
      />
      <div className={styles.buttonWrapper}>
        <Button
          text={'Cancel'}
          style={'primaryBtn'}
          onClick={() => setOpen(!open)}
        />
        <Button
          text={'Submit'}
          style={'lightBlueBtn'}
          onClick={() => {
            addAction(formData.typeValue)
            setOpen(false)
          }}
        />
      </div>
    </Modal>
  )
}

export default AddActionToProposalModal
