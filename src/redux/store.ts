import { configureStore } from '@reduxjs/toolkit'
import { type AppStore } from 'models'
import { userSlice, usersSlice } from './states'

export const store = configureStore<AppStore>({
  reducer: {
    user_active: userSlice,
    users: usersSlice
  }
})
