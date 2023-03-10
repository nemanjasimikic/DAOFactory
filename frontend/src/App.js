import { QueryClient, QueryClientProvider } from 'react-query'
import { ContextProvider } from './context/walletContext'
import Navigation from 'navigation'
import './App.css'

function App() {
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
