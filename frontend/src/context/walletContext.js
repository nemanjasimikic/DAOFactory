import { useState, createContext } from 'react'
import walletService from 'store/services/walletService'
export const WalletContext = createContext(null)

const initialState = {
  isLoggedIn: false,
  isLoginPending: false,
  loginError: false,
  addressContext: '',
  balanceContext: 0,
}

export const ContextProvider = (props) => {
  const [state, setState] = useState(initialState)

  const setLoginPending = (
    isLoginPending,
    isLoggedIn,
    loginError,
    addressContext,
    balanceContext
  ) =>
    setState({
      isLoginPending,
      isLoggedIn,
      loginError,
      addressContext,
      balanceContext,
    })

  const login = async (email, password) => {
    setLoginPending(true, false, false, '', 0)

    const response = await walletService.walletConnect(() => {})

    setLoginPending(false, true, false, response.address, response.balance * 1)
  }

  const logout = async () => {
    const response = await walletService.logout(() => {})
    setLoginPending(false, false, false, '', 0)
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
