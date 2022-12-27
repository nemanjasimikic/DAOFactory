import WalletContext from './context/walletContext'
import Navigation from 'navigation'
import './App.css'

function App() {
  return (
    <div className="container">
      <WalletContext.Provider
        value={{ address: 'Something', balance: '903193201' }}
      >
        <Navigation />
      </WalletContext.Provider>
    </div>
  )
}

export default App
