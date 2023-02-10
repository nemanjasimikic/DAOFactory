import { useState, useContext } from 'react'
import BalanceProposalInfo from 'components/BalanceProposalInfo'
import Button from 'components/common/Button'
import Input from 'components/common/Input'
import Tabs from 'components/common/Tabs'
import styles from './styles.module.sass'
import daoService from 'store/services/daoService'
import { WalletContext } from 'context/walletContext'
import { useQuery } from 'react-query'
import Spinner from '../../common/Spinner'
import { useNavigate } from 'react-router-dom'

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

      <Tabs titles={titles} active={active} setActive={setActive} />
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
            Your balance: {data?.daoBalance ? data.daoBalance : '-'}
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
                //navigate(`/dao/${id}`)
              }
            }
            await daoService
              .stakeTokens(data.daoAddress, address, formData.max * 1)
              .catch((e) => {
                setLoading(false)
                canNavigate = false
                return
              })
            navigateOff(canNavigate)
          }}
        />
      ) : (
        <Button
          style={'lightBlueBtn'}
          text={'Withdraw tokens'}
          onClick={async (e) => {
            setLoading(true)

            let canNavigate = true
            function navigateOff(canNavigate) {
              setLoading(false)
              if (canNavigate) {
                //navigate(`/dao/${id}`)
              }
            }
            await daoService
              .withdrawTokens(data.daoAddress, address, formData.max * 1)
              .catch((e) => {
                setLoading(false)
                canNavigate = false
                return
              })
            navigateOff(canNavigate)
          }}
        />
      )}
    </BalanceProposalInfo>
  )
}
export default AccountBalance
