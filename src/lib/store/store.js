import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import featureReducer from './features/features'

export const makeStore = () => {
    
  return configureStore({
    reducer: {
        userReducer: userReducer,
        featureReducer: featureReducer
    }
  })
}