import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Sidebar from 'components/common/Sidebar'
import ContentHeader from 'components/common/ContentHeader'
import Form from 'components/common/Form'
import Input from 'components/common/Input'
import Button from 'components/common/Button'
import styles from '../styles.module.sass'
import copy from 'static/svg/copy.svg'

const GeneralDaoSettings = () => {
  const { register } = useForm()
  const wallet = useSelector((state) => state.wallet)
  const navigate = useNavigate()
  const { id } = useParams()
  const [formData, setFormData] = useState({
    daoAddress: '',
    name: '',
    daoSlug: 'daoubilder.io/',
    description: '',
  })
  useEffect(() => {
    if (wallet.wallet === null) {
      navigate('/')
    }
  }, [wallet, navigate])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const dao /*, isError, isLoading*/ = useSelector((state) => state.dao)
  /*useEffect(() => {
    //dispatch(getAddressForRoot())
  }, [])*/

  console.log('formData: ', formData)
  console.log('id: ', id)
  return (
    <div className={styles.container}>
      <div className={styles.daoSettings}>
        <Sidebar />
        <div className={styles.contentWrapper}>
          <ContentHeader title={'DAO settings'} />
          <Form heading={'General'}>
            <Input
              id="daoAddress"
              label={'Dao Address'}
              placeholder={'DAO Address'}
              registerInput={'daoAddress'}
              firstImage={copy}
              onChange={onChange}
            />
            <Input
              id="name"
              label={'Project name'}
              placeholder={'Name'}
              registerInput={'name'}
              onChange={onChange}
            />
            <Input
              id="daoSlug"
              label={'DAO slug'}
              placeholder={'address'}
              registerInput={'daoSlug'}
              onChange={onChange}
            />
            <label>Description(optional)</label>
            <textarea
              id="description"
              {...register('description')}
              onChange={onChange}
            />
            <Button type={'bigLightBlueBtn'} text={'Save changes'} />
          </Form>
        </div>
      </div>
    </div>
  )
}

export default GeneralDaoSettings
