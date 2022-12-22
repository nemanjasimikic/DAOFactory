import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import daoService from 'store/services/daoService'

const allDAOs = JSON.parse(localStorage.getItem('daoAddresses'))

const initialState = {
  allDAOs: allDAOs ? allDAOs : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isDeployed: false,
}

export const getAllDAOs = createAsyncThunk(
  'getAllDAOs',
  async (dao, thunkAPI) => {
    try {
      const getDao = await daoService.getAllDAOs()

      return getDao
    } catch (error) {
      console.log('getAllDAOs error: ', error)
      return thunkAPI.rejectWithValue('')
    }
  }
)

export const daoSlice = createSlice({
  name: 'dao',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.isDeployed = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllDAOs.pending, (state) => {
        state.isLoading = true
        state.isDeployed = false
      })
      .addCase(getAllDAOs.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isDeployed = false
        state.allDAOs = action.payload
        //  console.log('state.dao: ', state.allDAOs)
      })
      .addCase(getAllDAOs.rejected, (state, action) => {
        state.isLoading = false
        state.isDeployed = false
        state.isError = true
        state.allDAOs = null
      })
  },
})

export const { reset } = daoSlice.actions
export default daoSlice.reducer
