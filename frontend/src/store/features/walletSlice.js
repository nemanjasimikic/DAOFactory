import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import walletService from 'store/services/walletService'
import { ProviderRpcClient } from 'everscale-inpage-provider'
const ever = new ProviderRpcClient()

const wallet = JSON.parse(localStorage.getItem('wallet'))
// const balance = JSON.parse(localStorage.getItem('balance'))

const initialState = {
  wallet: wallet ? wallet : null,
  balance: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
}

export const login = createAsyncThunk('login', async (wallet, thunkAPI) => {
  try {
    return await walletService.walletConnect()
  } catch (error) {
    return thunkAPI.rejectWithValue('')
  }
})

const getBalanceService = async () => {
  await ever
    .getBalance(wallet)
    .then((result) => {})
    .catch((error) => {
      console.log(error)
    })
}

console.log('SERVIS', getBalanceService())

export const getBalance = createAsyncThunk(
  'getBalance',
  async (_, thunkAPI) => {
    try {
      return await getBalanceService(wallet)
    } catch (error) {
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
        state.wallet = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.wallet = null
      })
      .addCase(getBalance.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBalance.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.balance = action.payload
        console.log('PAyLOAD', action.payload)
      })
      .addCase(getBalance.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.balance = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.wallet = null
      })
  },
})

export const { reset } = walletSlice.actions
export default walletSlice.reducer
