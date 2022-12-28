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
import { ProviderRpcClient } from 'everscale-inpage-provider'
import daoService from 'store/services/daoService'
import Spinner from 'components/common/Spinner'
import Table from 'components/common/Table'
const GeneralDaoSettings = () => {
  const { register } = useForm()
  const wallet = useSelector((state) => state.wallet)
  const navigate = useNavigate()
  let { id } = useParams()

  console.log('id: ', id)
  const { handleSubmit } = useForm()
  const ever = new ProviderRpcClient()
  useEffect(() => {
    if (wallet.wallet === null) {
      navigate('/')
    }
  }, [wallet, navigate])
  let [loading, setLoading] = useState(false)
  const [daoInformation, setDaoInformation] = useState({})
  /*useEffect(() => {
    daoService.getDaoInfo(id).then((data) => setDaoInformation(data))
  }, [])*/

  const onLoadEffect = () => {
    daoService.getDaoInfo(id).then((data) => setDaoInformation(data))
  }
  useEffect(onLoadEffect, [])

  const [formData, setFormData] = useState({
    daoAddress: '',
    name: '',
    daoSlug: 'daobuilder.nswebdevelopment.com/',
    description: '',
  })

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  let name
  let slug
  let description
  let slugChange
  if (daoInformation.name) {
    //loading = false
    let daoRootAddr = daoInformation.daoAddress ? daoInformation.daoAddress : ''
    name = daoInformation.name ? daoInformation.name : ''
    slug = daoInformation.slug ? daoInformation.slug : ''
    description = daoInformation.description ? daoInformation.description : ''

    const slugArray =
      formData.daoSlug == 'daobuilder.nswebdevelopment.com/'
        ? slug
        : formData.daoSlug

    console.log('slugArray: ', slugArray)
    slugChange = slugArray && slug != '' ? slugArray : daoInformation.slug
    console.log('slug: ', slug)
  }
  console.log('name: ', name)

  return name ? (
    <div>
      {loading && <Spinner />}
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
                placeholder={'slug'}
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
                  setLoading(true)
                  let canNavigate = true
                  function navigateOff(canNavigate) {
                    setLoading(false)
                    if (canNavigate) {
                      console.log('Resolved: true')
                      alert('Changes are saved!')
                      navigate('/')
                    }
                    console.log('Resolved: false')
                  }
                  await daoService
                    .setSettingsChanges(
                      formData.name !== ''
                        ? formData.name
                        : daoInformation.name,
                      slugChange,
                      formData.description !== ''
                        ? formData.description
                        : daoInformation.description,
                      daoInformation.daoAddress
                    )
                    .catch((e) => {
                      console.log(e)
                      setLoading(false)
                      canNavigate = false
                      return
                    })
                  e.preventDefault()
                  navigateOff(canNavigate)
                  //  setLoading(false)
                  //alert('Changes are saved!')
                  //navigate('/')
                }}
                disabled={loading}
              />
            </Form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>{<Spinner />}</div>
  )
}

export default GeneralDaoSettings
