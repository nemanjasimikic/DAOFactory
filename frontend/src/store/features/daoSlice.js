import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import daoService from 'store/services/daoService'

const dao = JSON.parse(localStorage.getItem('daoAddr'))
const topupV = JSON.parse(localStorage.getItem('topup'))
const deployValue = JSON.parse(localStorage.getItem('topup'))
const allDAOs = JSON.parse(localStorage.getItem('daoAddresses'))
const addressForRoot = JSON.parse(localStorage.getItem('daoRootAddress'))
const initialState = {
  dao: dao ? dao : null,
  topupV: topupV ? topupV : null,
  deployValue: deployValue ? deployValue : null,
  allDAOs: allDAOs ? allDAOs : null,
  addressForRoot: addressForRoot ? addressForRoot.rootAddress : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
}

export const getExpectedAddress = createAsyncThunk(
  'getExpectedAddress',
  async (dao, thunkAPI) => {
    try {
      //  console.log('Dao: ', dao)
      return await daoService.getExpectedAddress()
    } catch (error) {
      return thunkAPI.rejectWithValue('')
    }
  }
)

export const topup = createAsyncThunk('topup', async (dao, thunkAPI) => {
  try {
    // console.log('topup: ', dao)
    return await daoService.topup(dao)
  } catch (error) {
    console.log('error: ', error)
    return thunkAPI.rejectWithValue('')
  }
})

export const deployFactory = createAsyncThunk(
  'deployFactory',
  async (dao, thunkAPI) => {
    try {
      const pending = localStorage.getItem('pending').replace(/[^\w\s]/gi, '')
      const voting = localStorage.getItem('voting').replace(/[^\w\s]/gi, '')
      const quorum = JSON.parse(localStorage.getItem('quorum'))
      const queued = localStorage.getItem('queued').replace(/[^\w\s]/gi, '')
      const threshold = localStorage
        .getItem('threshold')
        .replace(/[^\w\s]/gi, '')
      const execution = localStorage
        .getItem('execution')
        .replace(/[^\w\s]/gi, '')
      const name = localStorage.getItem('name').replace(/[^\w\s]/gi, '')
      const slug = JSON.parse(localStorage.getItem('daoSlug'))
      const governanceToken = JSON.parse(
        localStorage.getItem('governanceToken')
      )

      const minStake = localStorage.getItem('minStake').replace(/[^\w\s]/gi, '')
      const description = JSON.parse(localStorage.getItem('description'))
      const treasury =
        JSON.parse(localStorage.getItem('treasury')) === 'on' ? true : false

      // console.log('pending: ', pending)
      // console.log('voting: ', voting)
      // console.log('quorum: ', quorum)
      // console.log('queued: ', queued)
      // console.log('threshold: ', threshold)
      // console.log('execution: ', execution)
      // console.log('name: ', name)
      // console.log('slug: ', slug)
      // console.log('governanceToken: ', governanceToken)
      // console.log('minStake: ', minStake)
      // console.log('description: ', description)
      // console.log('treasury: ', treasury)
      return await daoService.deployFactory(
        parseInt(pending),
        parseInt(voting),
        parseInt(quorum),
        parseInt(queued),
        parseInt(threshold),
        parseInt(execution),
        name,
        slug,
        governanceToken,
        parseInt(minStake),
        description,
        treasury
      )
    } catch (error) {
      console.log('error: ', error)

      return thunkAPI.rejectWithValue('')
    }
  }
)

export const validator = (data, page, what) => {
  let error = false

  // Page 1
  if (page == 0) {
    // Check to see if name is filled
    if (what === 'name') {
      if (!data || !data.replace(/\s/g, '').length) {
        error = true
      } else {
        error = false
      }
      // Check to see if governance token address is good
    } else if (what === 'governanceToken') {
      if (data.length < 66) {
        console.log('Error: Address too short')
        error = true
        // alert('Governance token is not valid. Address too short!')
        return 'Error: Address too short'
      } else if (!data.includes(':')) {
        console.log('Error: Address missing colon')
        error = true
        // alert('Governance token is not valid. Address missing colon!')
        return 'Error: Address missing colon'
      }
      // Check to see if min amount for staking is at least 1
    } else if (what === 'minStake') {
      if (data && data != 0 && !isNaN(data)) {
        error = false
      } else {
        error = true
      }
    }

    // Page 2
  } else if (page == 1) {
    if (
      what === 'threshold' &&
      parseInt(data) > 9999 &&
      parseInt(data) < 7000001
    ) {
      error = false
    } else {
      error = true
    }

    // Page 3
  } else if (page == 2) {
    var multiplier = what == 'Hours' ? 1 : 24
    if (data * multiplier >= 24 && data * multiplier <= 720 && !isNaN(data)) {
      error = false
    } else {
      error = true
    }
  }

  // console.log(`error of ${what} is: `, error, data)

  if (!error) {
    return true
  }
}

export const deployDAOFromFactory = createAsyncThunk(
  'deployDAOFromFactory',
  async (dao, thunkAPI) => {
    try {
      const pending = localStorage.getItem('pending').replace(/[^\w\s]/gi, '')
      const voting = localStorage.getItem('voting').replace(/[^\w\s]/gi, '')
      const quorum = localStorage.getItem('quorum')
      const queued = localStorage.getItem('queued').replace(/[^\w\s]/gi, '')
      const threshold = localStorage
        .getItem('threshold')
        .replace(/[^\w\s]/gi, '')
      const execution = localStorage
        .getItem('execution')
        .replace(/[^\w\s]/gi, '')
      const name = localStorage.getItem('name').replace(/[^\w\s]/gi, '')
      const slug = JSON.parse(localStorage.getItem('daoSlug'))
      const governanceToken = localStorage
        .getItem('governanceToken')
        .replace(/[^\w\s]/gi, '')
      const minStake = localStorage.getItem('minStake').replace(/[^\w\s]/gi, '')
      const description = JSON.parse(localStorage.getItem('description'))
      const treasury =
        JSON.parse(localStorage.getItem('treasury')) === 'on' ? true : false
      const address = JSON.parse(localStorage.getItem('daoAddr'))
      // console.log('pending: ', pending)
      // console.log('voting: ', voting)
      // console.log('quorum: ', quorum)
      // console.log('queued: ', queued)
      // console.log('threshold: ', threshold)
      // console.log('execution: ', execution)
      // console.log('name: ', name)
      // console.log('slug: ', slug)
      // console.log('governanceToken: ', governanceToken)
      // console.log('minStake: ', minStake)
      // console.log('description: ', description)
      // console.log('treasury: ', treasury)
      return await daoService.deployDAOFromFactory(
        parseInt(pending),
        parseInt(voting),
        parseInt(quorum),
        parseInt(queued),
        parseInt(threshold),
        parseInt(execution),
        name,
        slug,
        governanceToken,
        parseInt(minStake),
        description,
        treasury,
        address
      )
    } catch (error) {
      console.log('error: ', error)
      return thunkAPI.rejectWithValue('')
    }
  }
)

export const getAllDAOs = createAsyncThunk(
  'getAllDAOs',
  async (dao, thunkAPI) => {
    try {
      const getDao = await daoService.getAllDAOs()
      //  console.log('get dao: ', getDao)
      return getDao
    } catch (error) {
      console.log('getAllDAOs error: ', error)
      return thunkAPI.rejectWithValue('')
    }
  }
)

export const getAddressForRoot = createAsyncThunk(
  'getAddressForRoot',
  async (dao, thunkAPI) => {
    try {
      const address = await daoService.getAddressForRoot()
      // console.log('address for root: ', address)
      return address
    } catch (error) {
      console.log('getAddressForRoot error: ', error)
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExpectedAddress.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getExpectedAddress.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.dao = action.payload
      })
      .addCase(getExpectedAddress.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.dao = null
      })
      .addCase(topup.pending, (state) => {
        state.isLoading = true
      })
      .addCase(topup.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.dao = action.payload
        //console.log('state.dao: ', state.dao)
      })
      .addCase(topup.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.dao = null
        // console.log('rejected state dao: ', state.dao)
      })
      .addCase(deployFactory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deployFactory.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.deployValue = action.payload
        // console.log('state.dao: ', state.deployValue)
        localStorage.setItem('flag', JSON.stringify(1))
      })
      .addCase(deployFactory.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.deployValue = null
      })
      .addCase(getAllDAOs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllDAOs.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.allDAOs = action.payload
        //  console.log('state.dao: ', state.allDAOs)
      })
      .addCase(getAllDAOs.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.allDAOs = null
      })
      .addCase(getAddressForRoot.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAddressForRoot.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.addressForRoot = action.payload
        // console.log('state.addressForRoot: ', state.addressForRoot)
      })
      .addCase(getAddressForRoot.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.addressForRoot = null
      })
  },
})

export const { reset } = daoSlice.actions
export default daoSlice.reducer
