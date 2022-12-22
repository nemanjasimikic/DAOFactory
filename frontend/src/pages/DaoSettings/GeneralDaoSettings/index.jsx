import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Sidebar from 'components/common/Sidebar'
import ContentHeader from 'components/common/ContentHeader'
import Form from 'components/common/Form'
import Input from 'components/common/Input'
import Button from 'components/common/Button'
import styles from '../styles.module.sass'
import copy from 'static/svg/copy.svg'
import { getFactory } from 'store/features/daoSlice'
import daoAbi from '../../../helpers/DaoRoot.abi.json'
import daoFactoryAbi from '../../../helpers/DaoFactory.abi.json'
import { ProviderRpcClient } from 'everscale-inpage-provider'
import daoService from 'store/services/daoService'
const GeneralDaoSettings = () => {
  const { register } = useForm()
  const wallet = useSelector((state) => state.wallet)
  const navigate = useNavigate()
  const { id } = useParams()

  const { handleSubmit } = useForm()
  const ever = new ProviderRpcClient()
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
  const [formData, setFormData] = useState({
    daoAddress: '',
    name: '',
    daoSlug: 'daobuilder.nswebdevelopment.com/',
    description: '',
  })

  const [daoInformation, setDaoInformation] = useState({})
  useEffect(() => {
    daoService.getDaoInfo(id).then((data) => setDaoInformation(data))
  }, [])
  if (daoInformation.name) {
    let daoRootAddr = daoInformation.daoAddress ? daoInformation.daoAddress : ''
    let name = daoInformation.name ? daoInformation.name : ''
    let slug = daoInformation.slug ? daoInformation.slug : ''
    let description = daoInformation.description
      ? daoInformation.description
      : ''

    const slugArray =
      formData.daoSlug == 'daobuilder.nswebdevelopment.com/'
        ? slug
        : formData.daoSlug.split('/')[1]

    const slugChange = slugArray && slug != '' ? slugArray : daoInformation.slug

    return (
      <div className={styles.container}>
        <div className={styles.daoSettings}>
          <Sidebar id={id} />
          <div className={styles.contentWrapper}>
            <ContentHeader title={'DAO settings'} />
            <Form
              id="settingsForm"
              handleSubmit={handleSubmit}
              heading={'General'}
            >
              <Input
                id="daoAddress"
                label={'Dao Address'}
                placeholder={'DAO Address'}
                registerInput={'daoAddress'}
                value={
                  daoInformation.daoAddress ? daoInformation.daoAddress : ''
                }
                firstImage={copy}
                disabled={true}
              />
              <Input
                id="name"
                label={'Project name'}
                placeholder={'Name'}
                registerInput={'name'}
                defaultValue={name}
                onChange={onChange}
              />
              <Input
                id="daoSlug"
                label={'DAO slug'}
                placeholder={'address'}
                registerInput={'daoSlug'}
                defaultValue={slug}
                onChange={onChange}
              />

              <label>Description(optional)</label>
              <textarea
                id="description"
                {...register('description')}
                defaultValue={description}
                onChange={onChange}
              />
              <Button
                formId={'settingsForm'}
                style={'bigLightBlueBtn'}
                text={'Save changes'}
                onClick={async (e) => {
                  // handleSubmit(e)

                  await daoService.setSettingsChanges(
                    formData.name !== '' ? formData.name : daoInformation.name,
                    slugChange,
                    formData.description !== ''
                      ? formData.description
                      : daoInformation.description,
                    daoInformation.daoAddress
                  )
                  e.preventDefault()
                  alert('Changes are saved!')
                  navigate('/')
                }}
              />
            </Form>
          </div>
        </div>
      </div>
    )
  }
}
export default GeneralDaoSettings
