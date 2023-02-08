import { useState, useMemo } from 'react'
import { ContextProvider } from './context/walletContext'
import Navigation from 'navigation'
import './App.css'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

function App() {
  //const [wallet, setWallet] = useState({ address: '', balance: null })
  /*const providerValue = useMemo(
    () => ({ wallet, setWallet }),
    [wallet, setWallet]
  )*/
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  })

  return (
    <div className="container">
      <QueryClientProvider client={queryClient}>
        <ContextProvider value={500}>
          <Navigation client={queryClient} />
        </ContextProvider>
      </QueryClientProvider>
    </div>
  )
}

export default App
