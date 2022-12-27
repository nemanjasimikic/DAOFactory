import { createContext } from 'react'

const WalletContext = createContext({
  address: '',
  balance: '',
})

export default WalletContext
