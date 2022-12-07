import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import walletService from 'store/services/walletService'

const wallet = JSON.parse(localStorage.getItem('wallet'))

const initialState = {
  wallet: wallet ? wallet : null,
  balance: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
}

export const login = createAsyncThunk('login', async (wallet, thunkAPI) => {
  try {
    return await walletService.walletConnect(wallet)
  } catch (error) {
    return thunkAPI.rejectWithValue('')
  }
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
  },
})

export const { reset } = walletSlice.actions
export default walletSlice.reducer
