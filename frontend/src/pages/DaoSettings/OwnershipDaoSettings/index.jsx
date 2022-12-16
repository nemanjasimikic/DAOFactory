import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../../components/common/Sidebar'
import ContentHeader from '../../../components/common/ContentHeader'
import Input from '../../../components/common/Input'
import FormHeading from '../../../components/common/Form/FormHeading'
import Button from '../../../components/common/Button'
import styles from '../styles.module.sass'

const OwnershipDaoSettings = () => {
  const wallet = useSelector((state) => state.wallet)
  const navigate = useNavigate()

  useEffect(() => {
    if (wallet.wallet === null) {
      navigate('/')
    }
  }, [wallet, navigate])
  return (
    <div className={styles.container}>
      <div className={styles.daoSettings}>
        <Sidebar />
        <div className={styles.contentWrapper}>
          <ContentHeader title={'DAO settings'} />
          <FormHeading heading={'Ownership'} />
          <p>Transfer ownership to another address</p>
          <Input
            label={'New owner address'}
            placeholder={'Enter address'}
            registerInput={'ownerAddress'}
            type={'email'}
          />
          <Button style={'primaryBtn'} text={'Transfer'} />
          <div className={styles.line} />

          <Button style={'primaryBtn'} text={'Transfer to Black Hole'} />
        </div>
      </div>
    </div>
  )
}

export default OwnershipDaoSettings
