import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/lib/store'
import { addLocalStorageFavorites, removeLocalStorageFavorites, readLocalStorageFavorites } from '@/store/localStorage';
import type { JobType } from '@/types/types'



// Define a type for the slice state
export type JobsState = {
    loadingComplete: boolean;
    jobsArr: JobType[];
    favArr: JobType[];
}

// Define the initial state using that type
const initialState: JobsState = {
    loadingComplete: false,
    jobsArr: [], 
    favArr: []
}

export const jobsSlice = createSlice({
    name: 'jobs',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setLoadingComplete: (state, action: PayloadAction<boolean>) => {
            state.loadingComplete = action.payload;
        },
        setJobs: (state, action: PayloadAction<JobType[]>) => {
            if(action.payload !== undefined && action.payload !== null) {
                state.jobsArr = action.payload !== undefined ? action.payload : [];
            }
        },
        appendJobs: (state, action: PayloadAction<JobType[] | undefined>) => {
            if(action.payload !== undefined && action.payload !== null) {
                state.jobsArr.push(...action.payload);
            }
        },
        toggleFavorite: (state, action: PayloadAction<{id: string} | undefined>) => {
            const favJobArr = [state.jobsArr?.find(job => job.id === action.payload?.id), 
                                state.favArr?.find(job => job.id === action.payload?.id)];
            // Update arrays
            favJobArr.forEach((job) => {
                if(job) {
                    job.favorite = !job.favorite;
                }
            });
            // Update local storage
            const favJob = favJobArr.find(job => job !== undefined);
            if(favJob) {
                if(favJob.favorite) {
                    addLocalStorageFavorites(favJob);
                } else {
                    removeLocalStorageFavorites(favJob);
                }
            }
        },
        fetchFavorites: (state) => {
            state.favArr = readLocalStorageFavorites() as JobType[];
        },
    },
})

export const { setLoadingComplete, setJobs, appendJobs, toggleFavorite, fetchFavorites } = jobsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectLoadingComplete = (state: RootState) => state.jobs.loadingComplete
export const selectJobs = (state: RootState) => state.jobs.jobsArr
export const selectFavorites = (state: RootState) => state.jobs.favArr

export default jobsSlice.reducer
