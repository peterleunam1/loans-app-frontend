import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { localStorageTypes } from 'constant'
import { type UserCompleteModel, type UserModel } from 'models'
import { clearLocalStorage, getLocalStorage, persistLocalStorage } from 'utils'

const initialState: UserCompleteModel = {
  name: '',
  lastName: '',
  email: '',
  password: '',
  document: 0,
  department: '',
  city: '',
  born: '',
  loans: [],
  debts: []
}

const ownerSlice = createSlice({
  name: 'owner',

  initialState: getLocalStorage(localStorageTypes.OWNER)
    ? getLocalStorage(localStorageTypes.OWNER)
    : initialState,

  reducers: {
    setOwnerToPay: (state, action: PayloadAction<UserModel>) => {
      const result = { ...state, ...action.payload }
      persistLocalStorage<UserCompleteModel>(localStorageTypes.OWNER, result)
      return result
    },
    clearOwnerToPay: () => {
      clearLocalStorage(localStorageTypes.OWNER)
    }
  }
})
export const { setOwnerToPay, clearOwnerToPay } = ownerSlice.actions
export default ownerSlice.reducer
