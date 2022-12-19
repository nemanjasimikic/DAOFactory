import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../../../components/common/Sidebar'
import ContentHeader from '../../../components/common/ContentHeader'
import Input from '../../../components/common/Input'
import FormHeading from '../../../components/common/Form/FormHeading'
import Button from '../../../components/common/Button'
import styles from '../styles.module.sass'
import daoService from 'store/services/daoService'

const OwnershipDaoSettings = () => {
  const wallet = useSelector((state) => state.wallet)
  const navigate = useNavigate()
  const { id } = useParams()
  useEffect(() => {
    if (wallet.wallet === null) {
      navigate('/')
    }
  }, [wallet, navigate])

  const [formData, setFormData] = useState({
    ownerAddress: '',
  })

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  console.log('Form data: ', formData)
  return (
    <div className={styles.container}>
      <div className={styles.daoSettings}>
        <Sidebar id={id} />
        <div className={styles.contentWrapper}>
          <ContentHeader title={'DAO settings'} />
          <FormHeading heading={'Ownership'} />
          <p>Transfer ownership to another address</p>
          <Input
            id="ownerAddress"
            label={'New owner address'}
            placeholder={'Enter address'}
            registerInput={'ownerAddress'}
            type={'email'}
            onChange={onChange}
          />
          <Button
            style={'primaryBtn'}
            text={'Transfer'}
            onClick={async (e) => {
              e.preventDefault()
              await daoService.transferOwnership(formData.ownerAddress, id)
            }}
          />
          <Button
            style={'primaryBtn'}
            text={'Transfer to Black Hole'}
            onClick={async (e) => {
              e.preventDefault()
              await daoService.destroy(id)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default OwnershipDaoSettings
