import { useState, createContext } from 'react'
import walletService from 'store/services/walletService'
export const WalletContext = createContext(null)

const initialState = {
  isLoggedIn: false,
  isLoginPending: false,
  loginError: null,
  addressContext: '',
  balanceContext: 0,
}

export const ContextProvider = (props) => {
  const [state, setState] = useState(initialState)
  console.log('state init: ', state)
  const setLoginPending = (isLoginPending) => setState({ isLoginPending })
  const setLoginSuccess = (isLoggedIn) => setState({ isLoggedIn })
  const setLoginError = (loginError) => setState({ loginError })
  const setAddress = (addressContext) => setState({ addressContext })
  const setBalance = (balanceContext) => setState({ balanceContext })
  console.log('props: ', props)
  console.log('state: ', state)
  const login = async (email, password) => {
    setLoginPending(true)
    setLoginSuccess(false)
    setLoginError(null)

    /*fetchLogin( email, password, error => {
      setLoginPending(false);

      if (!error) {
        setLoginSuccess(true);
      } else {
        setLoginError(error);
      }
    })*/
    const response = await walletService.walletConnect(() => {
      setLoginPending(false)
      setLoginSuccess(true)
    })
    console.log('Response in context: ', response)
    setAddress(response.address)
    setBalance(response.balance)
    console.log('address: ', state.addressContext)
    console.log(state.isLoggedIn)
  }

  const logout = () => {
    setLoginPending(false)
    setLoginSuccess(false)
    setLoginError(null)
  }

  return (
    <WalletContext.Provider
      value={{
        state,
        login,
        logout,
      }}
    >
      {props.children}
    </WalletContext.Provider>
  )
}

// fake login
const fetchLogin = (email, password, callback) =>
  setTimeout(() => {
    if (email === 'admin' && password === 'admin') {
      return callback(null)
    } else {
      return callback(new Error('Invalid email and password'))
    }
  }, 1000)
