import { configureStore } from '@reduxjs/toolkit'
import { type AppStore } from 'models'
import { userSlice } from './states'

export const store = configureStore<AppStore>({
  reducer: {
    user: userSlice
  }
})
