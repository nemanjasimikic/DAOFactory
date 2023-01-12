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
    setLoginPending(true, false, null, '', 0)

    const response = await walletService.walletConnect(() => {})

    setLoginPending(false, true, null, response.address, response.balance * 1)
  }

  const logout = async () => {
    const response = await walletService.logout(() => {})
    setLoginPending(false, false, null, '', 0)
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
