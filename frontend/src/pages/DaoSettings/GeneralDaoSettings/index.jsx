import { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Sidebar from 'components/common/Sidebar'
import ContentHeader from 'components/common/ContentHeader'
import Form from 'components/common/Form'
import Input from 'components/common/Input'
import Button from 'components/common/Button'
import styles from '../styles.module.sass'
import copy from 'static/svg/copy.svg'
import daoService from 'store/services/daoService'
import Spinner from 'components/common/Spinner'
import { WalletContext } from 'context/walletContext'
import { useQuery } from 'react-query'
import Table from 'components/common/Table'
import { checkValidity, validator } from 'helpers/formValidator'
const GeneralDaoSettings = () => {
  const { register } = useForm()
  const navigate = useNavigate()
  let { id } = useParams()

  const { handleSubmit } = useForm()
  let [loading, setLoading] = useState(false)
  const [daoInformation, setDaoInformation] = useState({})
  let [pageChecked, setPageChecked] = useState(false)
  /*useEffect(() => {
    daoService.getDaoInfo(id).then((data) => setDaoInformation(data))
  }, [])*/

  const { state: ContextState } = useContext(WalletContext)
  const { addressContext } = ContextState
  console.log('addressContext', addressContext)
  /*const [daoInformation, setDaoInformation] = useState({})
  useEffect(() => {
    daoService
      .getDaoInfo(id, addressContext)
      .then((data) => setDaoInformation(data))
  }, [])*/
  const { data, isIdle, error, isError, isLoading } = useQuery(
    ['daoInfo', id],
    () => daoService.getDaoInfo(id, addressContext),
    {
      enabled: !!addressContext,
    } /* () =>
    daoService.getDaoInfo(id, addressContext)*/
  )
  /* const onLoadEffect = () => {
    daoService
      .getDaoInfo(id, addressContext)
      .then((data) => setDaoInformation(data))
  }
  useEffect(onLoadEffect, [])*/
  console.log('data: ', data)
  const [formData, setFormData] = useState({
    daoAddress: '',
    name: '',
    daoSlug: 'daobuilder.nswebdevelopment.com/',
    slug: daoInformation.slug ? daoInformation.slug : '',
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

  if (data?.name) {
    //loading = false
    let daoRootAddr = data.daoAddress ? data.daoAddress : ''
    name = data.name ? data.name : ''
    slug = data.slug ? data.slug : ''
    description = data.description ? data.description : ''

    const slugArray =
      formData.daoSlug === 'daobuilder.nswebdevelopment.com/'
        ? slug
        : formData.daoSlug

    slugChange = slugArray && slug !== '' ? slugArray : data.slug
  }

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
                label={'DAO Address'}
                placeholder={'DAO Address'}
                registerInput={'daoAddress'}
                value={data.daoAddress ? data.daoAddress : ''}
                firstImage={copy}
                disabled={true}
              />
              <Input
                id="name"
                validated={pageChecked}
                label={'Project name'}
                placeholder={'Name'}
                registerInput={'name'}
                defaultValue={name}
                // value={
                //   daoInformation.name ? daoInformation.name : ''
                // }
                onChange={onChange}
              />
              <Input
                id="daoSlugSettings"
                label={'DAO slug'}
                placeholder={'slug'}
                registerInput={'daoSlug'}
                // defaultValue={slug}
                value={slug} // formData.daoSlug
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
                  console.log(formData.name)
                  console.log(formData.slug)
                  console.log(formData.description)

                  // handleSubmit(e)
                  let pageValidity = [
                    validator(formData.name, 0, 'name', false, null),
                  ]
                  setLoading(true)
                  setPageChecked(true)
                  let canNavigate = true
                  function navigateOff(canNavigate) {
                    setLoading(false)
                    if (canNavigate) {
                      alert('Changes are saved!')
                      navigate('/')
                    }
                  }
                  await daoService
                    .setSettingsChanges(
                      formData.name !== '' ? formData.name : data.name,
                      slugChange,
                      formData.description !== ''
                        ? formData.description
                        : data.description,
                      data.daoAddress
                    )
                    .catch((e) => {
                      console.log(e)
                      setLoading(false)
                      canNavigate = false
                      return
                    })
                  e.preventDefault()
                  navigateOff(canNavigate)
                  if (checkValidity(pageValidity) === true) {
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
                    navigateOff(canNavigate)
                    e.preventDefault()
                  }
                  setLoading(false)
                  // comment till here
                }}
                // and the disabled too
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
