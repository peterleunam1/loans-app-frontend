import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { localStorageTypes } from 'constant'
import { type UserCompleteModel } from 'models'
import { clearLocalStorage, getLocalStorage, persistLocalStorage } from 'utils'

const initialState: UserCompleteModel[] = []

const usersSlice = createSlice({
  name: 'users',

  initialState: getLocalStorage(localStorageTypes.USERS)
    ? getLocalStorage(localStorageTypes.USERS)
    : initialState,

  reducers: {
    createUser: (state: UserCompleteModel[], action: PayloadAction<UserCompleteModel>) => {
      if (state.find((user) => user.document === action.payload.document)) {
        return state
      }
      if (state.find((user) => user.email === action.payload.email)) {
        return state
      }
      const result = [...state, action.payload]
      persistLocalStorage<UserCompleteModel[]>(localStorageTypes.USERS, result)
      return result
    },
    updateUser: (state: UserCompleteModel[], action: PayloadAction<UserCompleteModel>) => {
      if (!state.find((user) => user.document === action.payload.document)) {
        return state
      } else {
        const result = state.map((user) => {
          if (user.document === action.payload.document) {
            return action.payload
          }
          return user
        })
        persistLocalStorage<UserCompleteModel[]>(localStorageTypes.USERS, result)
        return result
      }
    },
    deleteUser: (state: UserCompleteModel[], action: PayloadAction<number>) => {
      const result = state.filter((user) => user.document !== action.payload)
      persistLocalStorage<UserCompleteModel[]>(localStorageTypes.USERS, result)
      return result
    },
    clearAllUsers: () => {
      clearLocalStorage(localStorageTypes.USERS)
      return initialState
    }
  }
})
export const { createUser, clearAllUsers, deleteUser, updateUser } = usersSlice.actions
export default usersSlice.reducer
