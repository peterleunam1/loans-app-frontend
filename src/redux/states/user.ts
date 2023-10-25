import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { localStorageTypes } from 'constant'
import { type DebtsModel, type LoansModel, type UserCompleteModel, type UserModel } from 'models'
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

const userSlice = createSlice({
  name: 'user',

  initialState: getLocalStorage(localStorageTypes.USER)
    ? getLocalStorage(localStorageTypes.USER)
    : initialState,

  reducers: {
    setUser: (state, action: PayloadAction<UserModel>) => {
      const result = { ...state, ...action.payload }
      persistLocalStorage<UserCompleteModel>(localStorageTypes.USER, result)
      return result
    },
    addUserLoan: (state, action: PayloadAction<LoansModel>) => {
      const result = { ...state, loans: [...state.loans, action.payload] }
      persistLocalStorage<UserCompleteModel>(localStorageTypes.USER, result)
      return result
    },
    addAbonoLoan: (state: UserCompleteModel, action: PayloadAction<LoansModel>) => {
      const result = {
        ...state,
        loans: state.loans.map((loan) => {
          if (loan.id === action.payload.id) {
            return action.payload
          }
          return loan
        })
      }
      persistLocalStorage<UserCompleteModel>(localStorageTypes.USER, result)
      return result
    },
    deleteLoan: (state: UserCompleteModel, action: PayloadAction<number>) => {
      const result = {
        ...state,
        loans: state.loans.filter((loan) => loan.id !== action.payload)
      }
      persistLocalStorage<UserCompleteModel>(localStorageTypes.USER, result)
      return result
    },
    addUserDebt: (state, action: PayloadAction<DebtsModel>) => {
      const result = { ...state, debts: [...state.debts, action.payload] }
      persistLocalStorage<UserCompleteModel>(localStorageTypes.USER, result)
      return result
    },
    resetUser: () => {
      clearLocalStorage(localStorageTypes.USER)
      return initialState
    }
  }
})
export const { setUser, resetUser, addUserLoan, addUserDebt, addAbonoLoan, deleteLoan } = userSlice.actions
export default userSlice.reducer
