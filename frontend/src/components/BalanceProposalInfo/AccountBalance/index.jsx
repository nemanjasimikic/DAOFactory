import { useState } from 'react'
import BalanceProposalInfo from 'components/BalanceProposalInfo'
import Button from 'components/common/Button'
import Input from 'components/common/Input'
import Tabs from 'components/common/Tabs'
import styles from './styles.module.sass'

const titles = ['Deposit', 'Withdraw']

const AccountBalance = () => {
  const [active, setActive] = useState(titles[0])
  return (
    <BalanceProposalInfo heading={'Account balance'}>
      <Tabs titles={titles} active={active} setActive={setActive} />
      <p className={styles.amount}>Amount</p>
      <div className={styles.inputWrapper}>
        <Input registerInput={'max'} />
        <p className={styles.result}>321321321</p>
        <Button style={'primaryBtn'} text={'Max'} />
      </div>
      {active === titles[0] ? (
        <Button style={'lightBlueBtn'} text={'Deposit tokens'} />
      ) : (
        <Button style={'lightBlueBtn'} text={'Withdraw tokens'} />
      )}
    </BalanceProposalInfo>
  )
}
export default AccountBalance
