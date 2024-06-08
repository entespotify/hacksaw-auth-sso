import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { filesApi } from './api/files.api'
import { appsApi } from './api/apps.api'
import authSlice from './authSlice'
import fileSlice from './fileSlice'
import { authApi } from './api/auth.api'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [filesApi.reducerPath]: filesApi.reducer,
    [appsApi.reducerPath]: appsApi.reducer,
    auth: authSlice,
    files: fileSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, filesApi.middleware, appsApi.middleware),
})
setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>