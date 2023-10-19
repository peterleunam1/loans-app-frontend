import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { localStorageTypes } from 'constant'
import { type UserModel } from 'models'
import { clearLocalStorage, getLocalStorage, persistLocalStorage } from 'utils'

const initialState: UserModel = {
  name: ''
}

const userSlice = createSlice({
  name: 'user',

  initialState: getLocalStorage(localStorageTypes.USER)
    ? getLocalStorage(localStorageTypes.USER)
    : initialState,

  reducers: {
    setUser: (state, action: PayloadAction<UserModel>) => {
      const result = { ...state, ...action.payload }
      persistLocalStorage<UserModel>(localStorageTypes.USER, result)
      return result
    },
    resetUser: () => {
      clearLocalStorage(localStorageTypes.USER)
      return initialState
    }
  }
})
export const { setUser, resetUser } = userSlice.actions
export default userSlice.reducer
