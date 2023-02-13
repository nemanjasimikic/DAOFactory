import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import daoService from 'store/services/daoService'
import BalanceProposalInfo from 'components/BalanceProposalInfo'
import Button from 'components/common/Button'
import Input from 'components/common/Input'
import Tabs from 'components/common/Tabs'
import Spinner from '../../common/Spinner'
import styles from './styles.module.sass'

const titles = ['Deposit', 'Withdraw']

const AccountBalance = ({ id, data, address }) => {
  const [active, setActive] = useState(titles[0])
  const navigate = useNavigate()

  let [loading, setLoading] = useState(false)
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onReset = () => {
    setFormData((prevState) => ({
      ...prevState,
      max: 0,
    }))
  }
  const [formData, setFormData] = useState({
    max: 0,
  })
  console.log('data: ', data)
  console.log('formData: ', formData)
  const clicked = false
  function setMax(clicked) {
    if (clicked && active === titles[0]) {
      formData.max = data.tokenBalance
      setFormData((prevState) => ({
        ...prevState,
        max: data ? data.tokenBalance : '',
      }))
      console.log('formData in function: ', formData.max)
    } else if (clicked && active === titles[1]) {
      formData.max = data.daoBalance
      setFormData((prevState) => ({
        ...prevState,
        max: data ? data.daoBalance : '',
      }))
    }
  }
  const { max } = formData

  return (
    <BalanceProposalInfo heading={'Account balance'}>
      {loading && <Spinner />}

      <Tabs
        titles={titles}
        active={active}
        setActive={setActive}
        onReset={onReset}
      />
      <p className={styles.amount}>Amount</p>
      {active === titles[0] ? (
        <div className={styles.inputWrapper}>
          <Input
            registerInput={'max'}
            id={'max'}
            onChange={onChange}
            value={max}
          />
          <p className={styles.result}>
            Your balance: {data?.tokenBalance ? data.tokenBalance : '-'}
          </p>
          <Button
            style={'primaryBtn'}
            text={'Max'}
            onClick={(e) => {
              e.preventDefault()
              //clicked = true
              setMax(true)
            }}
          />
        </div>
      ) : (
        <div className={styles.inputWrapper}>
          <Input
            registerInput={'max'}
            id={'max'}
            onChange={onChange}
            value={max}
          />
          <p className={styles.result}>
            Your balance: {data?.withdraw ? data.daoBalance : 0}
          </p>
          <Button
            style={'primaryBtn'}
            text={'Max'}
            onClick={(e) => {
              e.preventDefault()
              //clicked = true
              setMax(true)
            }}
          />
        </div>
      )}
      {active === titles[0] ? (
        <Button
          style={'lightBlueBtn'}
          text={'Deposit tokens'}
          onClick={async (e) => {
            setLoading(true)

            let canNavigate = true
            function navigateOff(canNavigate) {
              setLoading(false)
              if (canNavigate) {
                //navigate(`/dao/${id}/balance-management`)
              }
            }
            await daoService
              .stakeTokens(data.daoAddress, address, formData.max * 1)
              .catch((e) => {
                setLoading(false)
                canNavigate = false
                return
              })
            onReset()
            navigateOff(canNavigate)
          }}
        />
      ) : (
        <Button
          style={data?.withdraw === false ? 'disabledBtn' : 'lightBlueBtn'}
          text={'Withdraw tokens'}
          disabled={data?.withdraw === false}
          onClick={async (e) => {
            setLoading(true)

            let canNavigate = true
            function navigateOff(canNavigate) {
              setLoading(false)
              if (canNavigate) {
                // navigate(`/dao/${id}/balance-management`)
              }
            }
            await daoService
              .withdrawTokens(data.daoAddress, address, formData.max * 1)
              .catch((e) => {
                setLoading(false)
                canNavigate = false
                return
              })
            onReset()
            navigateOff(canNavigate)
          }}
        />
      )}
    </BalanceProposalInfo>
  )
}
export default AccountBalance
