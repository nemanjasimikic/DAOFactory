import { useState, useMemo } from 'react'
import WalletContext from './context/walletContext'
import Navigation from 'navigation'
import './App.css'

function App() {
  const [wallet, setWallet] = useState({ address: '', balance: null })
  const providerValue = useMemo(
    () => ({ wallet, setWallet }),
    [wallet, setWallet]
  )
  return (
    <div className="container">
      <WalletContext.Provider value={providerValue}>
        <Navigation />
      </WalletContext.Provider>
    </div>
  )
}

export default App
