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

const AccountBalance = ({ id }) => {
  const [active, setActive] = useState(titles[0])
  const navigate = useNavigate()
  const { state: ContextState } = useContext(WalletContext)
  const { addressContext } = ContextState
  const { data } = useQuery(
    ['daoRoot', id],
    () => daoService.getDaoInfo(id, addressContext),
    {
      enabled: !!addressContext,
    }
  )
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

  console.log('formData: ', formData)
  return (
    <BalanceProposalInfo heading={'Account balance'}>
      {loading && <Spinner />}

      <Tabs titles={titles} active={active} setActive={setActive} />
      <p className={styles.amount}>Amount</p>
      <div className={styles.inputWrapper}>
        <Input registerInput={'max'} id={'amount'} onChange={onChange} />
        <p className={styles.result}>Your balance: 321321321</p>
        <Button style={'primaryBtn'} text={'Max'} />
      </div>
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
              .stakeTokens(data.daoAddress, addressContext, formData.max * 1)
              .catch((e) => {
                setLoading(false)
                canNavigate = false
                return
              })
            navigateOff(canNavigate)
          }}
        />
      ) : (
        <Button style={'lightBlueBtn'} text={'Withdraw tokens'} />
      )}
    </BalanceProposalInfo>
  )
}
export default AccountBalance
