import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import walletService from 'store/services/walletService'
import { ProviderRpcClient } from 'everscale-inpage-provider'
import BigNumber from 'bignumber.js';
const ever = new ProviderRpcClient()

const wallet = JSON.parse(localStorage.getItem('wallet'))
//const balance = JSON.parse(localStorage.getItem('balance'))
console.log('wallet address: ', wallet)
 const balance = JSON.parse(localStorage.getItem('balance'))
 console.log('balance from start: ', balance)

const initialState = {
  wallet: wallet ? wallet : null,
  balance: balance ? parseInt(balance*1) / Math.pow(10, 9) : 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
}
console.log('Initial state: ', initialState.balance)
export const login = createAsyncThunk('login', async (wallet, thunkAPI) => {
  try {
    const response = await walletService.walletConnect()
    if(response)
    {
      console.log('Response: ', response)
    }
    return response
  } catch (error) {
    console.log('Login error: ', error)
    return thunkAPI.rejectWithValue('')
  }
})

const getBalanceService = async () => {
  await ever
    .getBalance(wallet)
    .then((result) => {console.log('get balance service: ', result)
    localStorage.setItem('balance', JSON.stringify(result))
  })
    .catch((error) => {
      console.log(error)
    })
}

console.log('SERVIS', getBalanceService())

export const getBalance = createAsyncThunk(
  'getBalance',
  async (_, thunkAPI) => {
    try {
      const gbResponse = await walletService.getBalance(wallet)
      console.log('gbResponse: ', gbResponse)
      return gbResponse
    } catch (error) {
      console.log('Error: ', error)
      return thunkAPI.rejectWithValue('')
    }
  }
)

export const logout = createAsyncThunk('logout', async () => {
  await walletService.logout()
})

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.wallet= action.payload.address
        state.balance = parseInt(action.payload.balance*1) / Math.pow(10, 9)
        console.log('action payload: ', action.payload)
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.wallet = null
      })
  /*    .addCase(getBalance.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBalance.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.balance = action.payload
        console.log('PAyLOAD', state)
      })
      .addCase(getBalance.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.balance = null
        console.log('balance error: ', state.balance)
      })*/
      .addCase(logout.fulfilled, (state) => {
        state.wallet = null
      })
  },
})

export const { reset } = walletSlice.actions
export default walletSlice.reducer
