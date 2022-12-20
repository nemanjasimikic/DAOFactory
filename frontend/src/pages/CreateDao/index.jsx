import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  deployFactory,
  deployDAOFromFactory,
  getAllDAOs,
  getAddressForRoot,
  reset,
} from 'store/features/daoSlice'
import Sidebar from 'components/common/Sidebar'
import GeneralInformation from 'pages/CreateDao/GeneralInformation'
import VotingConfiguration from 'pages/CreateDao/VotingConfiguration'
import ProposalTimeline from 'pages/CreateDao/ProposalTimeline'
import Treasury from 'pages/CreateDao/Treasury'
import ContentHeader from 'components/common/ContentHeader'
import Form from 'components/common/Form'
import Button from '../../components/common/Button'
import CreateDaoInfo from 'components/CreateDaoInfo'
import rightArrow from 'static/svg/rightArrow.svg'
import leftArrow from 'static/svg/leftArrow.svg'
import styles from './styles.module.sass'
import Spinner from '../../components/common/Spinner'
import { useForm } from 'react-hook-form'
import { validator } from 'helpers/formValidator'

const CreateDao = () => {
  const wallet = useSelector((state) => state.wallet)
  const { dao, isLoading, isDeployed } = useSelector((state) => state.dao)
  const navigate = useNavigate()

  const { handleSubmit } = useForm()
  // const onSubmit = (data, e) => console.log(data, e)

  useEffect(() => {
    if (wallet.wallet === null) {
      navigate('/')
    }

    return () => {
      reset()
    }
  }, [wallet, navigate])

  if (isDeployed) {
    navigate('/')
  }

  const dispatch = useDispatch()
  const [page, setPage] = useState(0)
  const [formData, setFormData] = useState({
    daoAddress: '',
    name: '',
    daoSlug: 'daoubilder.io/',
    governanceToken: '',
    minStake: '',
    quorum: 51,
    threshold: 10000,
    pending: 48,
    pendingTime: 'Hours',
    queued: 48,
    queuedTime: 'Hours',
    voting: 72,
    votingTime: 'Hours',
    execution: 48,
    executionTime: 'Hours',
    totalTime: 96,
    treasury: false,
    description: '',
    token: '',
  })

  useEffect(() => {
    dispatch(getAddressForRoot())
  }, [dao, dispatch])

  const addressForRoot = JSON.parse(localStorage.getItem('daoRootAddress'))
    ? JSON.parse(localStorage.getItem('daoRootAddress')).rootAddress
    : ''
  //console.log('addressForRoot: ', addressForRoot)
  const FormTitles = [
    'General information',
    'Voting configuration',
    'Proposal timeline ',
    'Treasury',
  ]

  const PageDisplay = () => {
    if (page === 0) {
      return (
        <GeneralInformation
          formData={formData}
          rootAddress={addressForRoot}
          setFormData={setFormData}
        />
      )
    } else if (page === 1) {
      return (
        <VotingConfiguration formData={formData} setFormData={setFormData} />
      )
    } else if (page === 2) {
      return <ProposalTimeline formData={formData} setFormData={setFormData} />
    } else {
      return <Treasury formData={formData} setFormData={setFormData} />
    }
  }
  console.log('formData: ', formData)

  formData.pendingTime === 'Hours'
    ? localStorage.setItem('pending', JSON.stringify(formData.pending * 3600))
    : localStorage.setItem(
        'pending',
        JSON.stringify(formData.pending * 3600 * 24)
      )
  formData.votingTime === 'Hours'
    ? localStorage.setItem('voting', JSON.stringify(formData.voting * 3600))
    : localStorage.setItem(
        'voting',
        JSON.stringify(formData.voting * 3600 * 24)
      )
  localStorage.setItem('quorum', JSON.stringify(formData.quorum))
  formData.queuedTime === 'Hours'
    ? localStorage.setItem('queued', JSON.stringify(formData.queued * 3600))
    : localStorage.setItem(
        'queued',
        JSON.stringify(formData.queued * 3600 * 24)
      )
  localStorage.setItem('threshold', JSON.stringify(formData.threshold))
  formData.executionTime === 'Hours'
    ? localStorage.setItem(
        'execution',
        JSON.stringify(formData.execution * 3600)
      )
    : localStorage.setItem(
        'execution',
        JSON.stringify(formData.execution * 3600 * 24)
      )
  localStorage.setItem('daoAddress', JSON.stringify(formData.daoAddress))
  localStorage.setItem('name', JSON.stringify(formData.name))
  const slug = formData.daoSlug.split('/')
  console.log('slug splitted: ', slug[1])
  localStorage.setItem('daoSlug', JSON.stringify(slug[1]))
  localStorage.setItem(
    'governanceToken',
    JSON.stringify(formData.governanceToken)
  )
  localStorage.setItem('minStake', JSON.stringify(formData.minStake))
  localStorage.setItem('treasury', JSON.stringify(formData.treasury))
  localStorage.setItem('description', JSON.stringify(formData.description))

  //console.log('Form data: ', formData)

  return (
    <div className={styles.container}>
      {isLoading && <Spinner />}
      <div className={styles.createDao}>
        <Sidebar page={page} setPage={setPage} />
        <div className={styles.createDaoContent}>
          <ContentHeader title={'Create new DAO'} />
          {/* // TODO: */}
          <Form handleSubmit={handleSubmit} heading={FormTitles[page]}>
            {PageDisplay()}
          </Form>
        </div>
        <CreateDaoInfo page={page} formData={formData} />
      </div>
      <div className={styles.formNavigation}>
        <Button
          style={'transparentBtn'}
          text={'Back'}
          leftArrow={leftArrow}
          onClick={() => {
            window.scrollTo(0, 0)
            if (page !== 0) {
              setPage((currentPage) => currentPage - 1)
            } else {
              // Add a "navigate to main page" here maybe?
            }
          }}
        />
        <Button
          disabled={page > 3}
          onClick={() => {
            window.scrollTo(0, 0)
            if (validator(formData.governanceToken) == true) {
              if (page < 3) {
                setPage((currentPage) => currentPage + 1)
              } else if (page === 3) {
                dispatch(deployFactory())
              }
            }
          }}
          style={'bigLightBlueBtn'}
          rightArrow={page < 3 ? rightArrow : ''}
          text={page < 3 ? 'Next' : 'Create Dao'}
        />
      </div>
    </div>
  )
}

export default CreateDao
