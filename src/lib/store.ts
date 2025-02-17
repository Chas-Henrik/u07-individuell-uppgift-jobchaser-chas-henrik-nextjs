import { configureStore } from '@reduxjs/toolkit'
import { jobsSlice } from '@/lib/features/lists/jobsSlice'
import { filterSlice } from '@/lib/features/filters/filterSlice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            jobs: jobsSlice.reducer,
            filter: filterSlice.reducer,
        },
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']