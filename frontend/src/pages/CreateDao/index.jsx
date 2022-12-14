import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  deployFactory,
  deployDAOFromFactory,
  getAllDAOs,
  getAddressForRoot,
  validator,
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

const CreateDao = () => {
  const wallet = useSelector((state) => state.wallet)
  const navigate = useNavigate()

  useEffect(() => {
    if (wallet.wallet === null) {
      navigate('/')
    }
  }, [wallet, navigate])
  const dispatch = useDispatch()
  const [page, setPage] = useState(0)
  const [formData, setFormData] = useState({
    daoAddress: '',
    name: '',
    daoSlug: 'daoubilder.io/',
    governanceToken: '',
    minStake: 0,
    quorum: 51,
    threshold: 100,
    pending: 0,
    pendingTime: 'Hours',
    queued: 0,
    queuedTime: 'Hours',
    voting: 0,
    votingTime: 'Hours',
    execution: 0,
    executionTime: 'Hours',
    totalTime: 0,
    treasury: false,
    description: '',
  })
  const { dao, isError, isLoading } = useSelector((state) => state.dao)
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
  localStorage.setItem('daoSlug', JSON.stringify(formData.daoSlug))
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
      <div className={styles.createDao}>
        <Sidebar page={page} setPage={setPage} />
        <div className={styles.createDaoContent}>
          <ContentHeader title={'Create new DAO'} />
          <Form heading={FormTitles[page]}>{PageDisplay()}</Form>
        </div>
        <CreateDaoInfo page={page} formData={formData} />
      </div>
      <div className={styles.formNavigation}>
        <Button
          type={'transparentBtn'}
          text={'Back'}
          leftArrow={leftArrow}
          onClick={() => {
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
            if (validator(formData.governanceToken) == true) {
              if (page < 3) {
                setPage((currentPage) => currentPage + 1)
              } else if (page === 3) {
                dispatch(deployFactory())
                /*const flag = JSON.parse(localStorage.getItem('flag'))
                console.log('flag: ', flag)
                if (parseInt(flag) == 1) {
                  window.confirm(
                    'Do you really want to leave? Airdrop contract will not be saved!'
                  )
                }*/
              }
            } else {
            }
          }}
          type={'bigLightBlueBtn'}
          rightArrow={page < 3 ? rightArrow : ''}
          text={page < 3 ? 'Next' : 'Create DAO'}
        />
      </div>
    </div>
  )
}

export default CreateDao
