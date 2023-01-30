import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { WalletContext } from 'context/walletContext'
import daoService from 'store/services/daoService'
import GeneralInformation from 'pages/CreateDao/GeneralInformation'
import VotingConfiguration from 'pages/CreateDao/VotingConfiguration'
import ProposalTimeline from 'pages/CreateDao/ProposalTimeline'
import Treasury from 'pages/CreateDao/Treasury'
import Sidebar from 'components/common/Sidebar'
import ContentHeader from 'components/common/ContentHeader'
import Form from 'components/common/Form'
import Button from 'components/common/Button'
import CreateDaoInfo from 'components/CreateDaoInfo'
import Spinner from '../../components/common/Spinner'
import rightArrow from 'static/svg/rightArrow.svg'
import leftArrow from 'static/svg/leftArrow.svg'
import styles from './styles.module.sass'
import { useForm } from 'react-hook-form'
import {
  validator,
  checkValidity,
  isEmptyOrSpaces,
} from 'helpers/formValidator'
const CreateDao = () => {
  const navigate = useNavigate()

  //// REACT HOOK FORM FOR VALIDATION ////
  const {
    register,
    formState: { errors },
  } = useForm()

  const [page, setPage] = useState(0)
  let [loading, setLoading] = useState(false)
  let [pageChecked, setPageChecked] = useState([false, false, false, false])
  const [formData, setFormData] = useState({
    daoAddress: '',
    name: '',
    daoSlug: 'daobuilder.nswebdevelopment.com/dao/',
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
    icon: '',
    nonce: 0,
  })
  const { state: ContextState } = useContext(WalletContext)
  const { addressContext } = ContextState
  const [daoInformation, setDaoInformation] = useState({})
  useEffect(() => {
    daoService.getAddressForRoot().then((data) => setDaoInformation(data))
  }, [])

  const FormTitles = [
    'General information',
    'Voting configuration',
    'Proposal timeline ',
    'Treasury',
  ]
  let { daoAddress } = formData
  daoAddress = daoInformation.rootAddress
  const PageDisplay = () => {
    if (page === 0) {
      return (
        <GeneralInformation
          validated={pageChecked}
          formId={'myForm'}
          formData={formData}
          rootAddress={daoAddress}
          setFormData={setFormData}
          errors={errors}
        />
      )
    } else if (page === 1) {
      return (
        <VotingConfiguration
          validated={pageChecked}
          formData={formData}
          setFormData={setFormData}
        />
      )
    } else if (page === 2) {
      return (
        <ProposalTimeline
          validated={pageChecked}
          formData={formData}
          setFormData={setFormData}
        />
      )
    } else {
      return (
        <Treasury
          validated={pageChecked}
          formData={formData}
          setFormData={setFormData}
        />
      )
    }
  }
  const pendingTime =
    formData.pendingTime === 'Hours'
      ? formData.pending * 3600
      : formData.pending * 3600 * 24

  const votingTime =
    formData.votingTime === 'Hours'
      ? formData.voting * 3600
      : formData.voting * 3600 * 24

  const queuedTime =
    formData.queuedTime === 'Hours'
      ? formData.queued * 3600
      : formData.queued * 3600 * 24

  const executionTime =
    formData.executionTime === 'Hours'
      ? formData.execution * 3600
      : formData.execution * 3600 * 24

  return (
    <div className={styles.container}>
      {loading && <Spinner />}
      <div className={styles.createDao}>
        <Sidebar page={page} setPage={setPage} />
        <div className={styles.createDaoContent}>
          <ContentHeader title={'Create new DAO'} />
          {/* // TODO: */}
          <Form
            formData={formData}
            id={'myForm'}
            heading={FormTitles[page]}
            errors={errors}
          >
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
          formId={'myForm'}
          disabled={page > 3}
          onClick={async () => {
            // scroll to top
            window.scrollTo(0, 0)

            let pageValidity = []

            page === 0
              ? setPageChecked([true, false, false, false])
              : page === 1
              ? setPageChecked([true, true, false, false])
              : page === 2
              ? setPageChecked([true, true, true, false])
              : setPageChecked([true, true, true, true])

            if (page === 0) {
              pageValidity = [
                validator(formData.name, page, 'name', false, null),
                validator(
                  formData.governanceToken,
                  page,
                  'governanceToken',
                  false,
                  null
                ),
                validator(formData.daoSlug, page, 'daoSlug', false, null),
                validator(formData.minStake, page, 'minStake', false, null),
              ]
            } else if (page == 1) {
              pageValidity = [
                validator(formData.threshold, page, 'threshold', false, null),
              ]
            } else if (page == 2) {
              pageValidity = [
                validator(
                  formData.pending,
                  page,
                  formData.pendingTime,
                  false,
                  null
                ),
                validator(
                  formData.queued,
                  page,
                  formData.queuedTime,
                  false,
                  null
                ),
                validator(
                  formData.voting,
                  page,
                  formData.votingTime,
                  false,
                  true
                ),
                validator(
                  formData.execution,
                  page,
                  formData.executionTime,
                  false,
                  null
                ),
              ]
            }

            console.log('PAGE VALIDITY:', checkValidity(pageValidity))

            if (checkValidity(pageValidity) === true) {
              if (page < 3) {
                // setPage((currentPage) => currentPage + 1)
              } else if (page === 3) {
                setLoading(true)

                let canNavigate = true
                function navigateOff(canNavigate) {
                  setLoading(false)
                  if (canNavigate) {
                    navigate('/')
                  }
                }
                await daoService
                  .deployFactory(
                    pendingTime,
                    votingTime,
                    formData.quorum,
                    queuedTime,
                    formData.threshold,
                    executionTime,
                    formData.name,
                    formData.daoSlug.split('/')[2],
                    formData.governanceToken,
                    formData.minStake * 1,
                    formData.description,
                    formData.treasury,
                    formData.nonce == 0 ? daoInformation.nonce : formData.nonce,
                    addressContext
                  )
                  .catch((e) => {
                    console.log(e)
                    setLoading(false)
                    canNavigate = false
                    return
                  })
                navigateOff(canNavigate)
              }
            }
          }}
          style={'bigLightBlueBtn'}
          rightArrow={page < 3 ? rightArrow : ''}
          text={page < 3 ? 'Next' : 'Create DAO'}
        />
      </div>
    </div>
  )
}

export default CreateDao
