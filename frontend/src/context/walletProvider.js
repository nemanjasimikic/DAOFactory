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

/*const initialAddressState = {
  addressContext: '',
  balanceContext: 0,
}*/

export const ContextProvider = (props) => {
  const [state, setState] = useState(initialState)
  // const [addressState, setAddressState] = useState(initialAddressState)
  console.log('state init: ', state)
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
  // const setLoginSuccess = (isLoggedIn) => setState({ isLoggedIn })
  //const setLoginError = (loginError) => setState({ loginError })
  //const setAddressAndBalance = (addressContext, balanceContext) =>
  // setAddressState({ addressContext, balanceContext })
  //const setBalance = (balanceContext) => setState({ balanceContext })
  console.log('props: ', props)
  console.log('state: ', state)
  const login = async (email, password) => {
    setLoginPending(true, false, null, '', 0)
    //setLoginSuccess(false)
    //setLoginError(null)

    /*fetchLogin( email, password, error => {
      setLoginPending(false);

      if (!error) {
        setLoginSuccess(true);
      } else {
        setLoginError(error);
      }
    })*/
    const response = await walletService.walletConnect(() => {
      //setLoginPending(false)
      //setLoginSuccess(true)
    })
    console.log('Response in context: ', response)
    //setAddressAndBalance(response.address, response.balance)
    //setBalance(response.balance)
    setLoginPending(false, true, null, response.address, response.balance * 1)
    console.log('address: ', state)
    //console.log(state.isLoggedIn)
  }

  const logout = () => {
    setLoginPending(false, false, null, '', 0)
    // setLoginSuccess(false)
    // setLoginError(null)
  }

  return (
    <WalletContext.Provider
      value={{
        state,
        //  addressState,
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
