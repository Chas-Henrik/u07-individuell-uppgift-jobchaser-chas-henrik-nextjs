import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/lib/store'
import { addLocalStorageFavorites, removeLocalStorageFavorites, readLocalStorageFavorites } from '@/store/localStorage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ApiJobType, JobType } from '@/types/types'


// https://jobsearch.api.jobtechdev.se/search?offset=${pageNum*pageSize}&limit=${pageSize}&remote=true

// Define a service using a base URL and expected endpoints
export const jobTechDevAPI = createApi({
    reducerPath: 'jobTechDevAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jobsearch.api.jobtechdev.se/' }),
    endpoints: (builder) => ({
        getJobs: builder.query<ApiJobType, {pageNum:number; pageSize:number}>({
            query: (args) => {
                // Destructuring Object
                const { pageNum, pageSize } = args;
                return {
                    url: `search?offset=${pageNum * pageSize}&limit=${pageSize}&remote=true`,
                }
            },
        }),
    }),
})


// Define a type for the slice state
export type JobsState = {
    loadingComplete: boolean;
    jobsArr: JobType[];
    favArr: JobType[];
}

export type FavoritePayload = {
    id: string;
    favorite: boolean;
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
                state.jobsArr = [...(state.jobsArr), ...(action.payload)];
            }
        },
        setFavorite: (state, action: PayloadAction<FavoritePayload | undefined>) => {
            if(action.payload !== undefined && action.payload !== null) {
                const job: (JobType | undefined) = state.jobsArr?.find(job => job.id === action.payload?.id);
                const favJob: (JobType | undefined) = state.favArr?.find(job => job.id === action.payload?.id);
                if(job) {
                    job.favorite = action.payload.favorite;
                    if (action.payload.favorite) {
                        addLocalStorageFavorites(job);
                    } else {
                        removeLocalStorageFavorites(job);
                    }
                }
                if(favJob) {
                    favJob.favorite = action.payload.favorite;
                    if (action.payload.favorite) {
                        addLocalStorageFavorites(favJob);
                    } else {
                        removeLocalStorageFavorites(favJob);
                    }
                }
            }
        },
        toggleFavorite: (state, action: PayloadAction<{id: string} | undefined>) => {
            if(action.payload !== undefined && action.payload !== null) {
                const job: (JobType | undefined) = state.jobsArr?.find(job => job.id === action.payload?.id);
                const favJob: (JobType | undefined) = state.favArr?.find(job => job.id === action.payload?.id);
                if(job) {
                    job.favorite = !job.favorite;
                    if(job.favorite) {
                        addLocalStorageFavorites(job);
                    } else {
                        removeLocalStorageFavorites(job);
                    }
                }
                if(favJob) {
                    favJob.favorite = !favJob.favorite;
                    if(favJob.favorite) {
                        addLocalStorageFavorites(favJob);
                    } else {
                        removeLocalStorageFavorites(favJob);
                    }
                }
            }
        },
        fetchFavorites: (state) => {
            state.favArr = readLocalStorageFavorites() as JobType[];
        },
    },
})

export const { setLoadingComplete, setJobs, appendJobs, setFavorite, toggleFavorite, fetchFavorites } = jobsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectLoadingComplete = (state: RootState) => state.jobs.loadingComplete
export const selectJobs = (state: RootState) => state.jobs.jobsArr
export const selectFavorites = (state: RootState) => state.jobs.favArr
export const { useGetJobsQuery } = jobTechDevAPI

export default jobsSlice.reducer
