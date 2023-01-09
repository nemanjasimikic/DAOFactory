import { useState, useMemo } from 'react'
import { ContextProvider } from './context/walletProvider'
import Navigation from 'navigation'
import './App.css'

function App() {
  //const [wallet, setWallet] = useState({ address: '', balance: null })
  /*const providerValue = useMemo(
    () => ({ wallet, setWallet }),
    [wallet, setWallet]
  )*/
  return (
    <div className="container">
      <ContextProvider value={500}>
        <Navigation />
      </ContextProvider>
    </div>
  )
}

export default App
