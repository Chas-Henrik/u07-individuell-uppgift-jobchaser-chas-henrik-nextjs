import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/lib/store'
import { addLocalStorageFavorites, removeLocalStorageFavorites, readLocalStorageFavorites } from '@/store/localStorage';

export type ApiJobData = {
    id: string;
    logo_url: string;
    employer: { name: string };
    headline: string;
    occupation_group: { label: string };
    occupation: { label: string };
    publication_date: string;
    application_deadline: string;
    employment_type: { label: string };
    workplace_address: { city: string; region: string; country: string };
    webpage_url: string;
}

export type ApiJobType = { 
    total: { value: number }, 
    hits: ApiJobData[] 
}

export type JobType = {
    id: string;
    favorite: boolean;
    logo_url: string;
    employer:  string;
    headline: string;
    position: string;
    role: string;
    posted: string;
    expires: string;
    contract: string;
    city: string;
    region: string;
    country: string;
    url: string;
}

export const fetchJobs = createAsyncThunk<
    ApiJobType,             // The resolved data type (what you return)
    string,                 // The payload type you expect
    { rejectValue: string } // Optionally, the type of 'rejectWithValue'
>(
    'jobs/fetchJobs',
    async (url, { rejectWithValue }) => {
        try {
            const response = await fetch(url);
            if(!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

// Define a type for the slice state
export type JobsState = {
    jobsArr: JobType[];
    favArr: JobType[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export type FavoritePayload = {
    id: string;
    favorite: boolean;
}

// Define the initial state using that type
const initialState: JobsState = { 
    jobsArr: [], 
    favArr: [],
    status: 'idle',
    error: null,
}

export const jobsSlice = createSlice({
    name: 'jobs',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setJobs: (state, action: PayloadAction<JobType[]>) => {
            if(action.payload !== undefined && action.payload !== null) {
                state.jobsArr = action.payload !== undefined ? action.payload : [];
            }
        },
        appendJobs: (state, action: PayloadAction<JobType[] | undefined>) => {
            if(action.payload !== undefined && action.payload !== null) {
                state.jobsArr = state.jobsArr.concat(action.payload);
            }
        },
        setFavorite: (state, action: PayloadAction<FavoritePayload | undefined>) => {
            if(action.payload !== undefined && action.payload !== null) {
                const job: (JobType | undefined) = state.jobsArr?.find(job => job.id === action.payload?.id);
                const favJob: (JobType | undefined) = state.favArr?.find(job => job.id === action.payload?.id);
                if(job) {
                    job.favorite = action.payload.favorite;
                }
                if(favJob) {
                    favJob.favorite = action.payload.favorite;
                }
                if(job) {
                    if (action.payload.favorite) {
                        addLocalStorageFavorites(job);
                    } else {
                        removeLocalStorageFavorites(job);
                    }
                } else if(favJob) {
                    if (action.payload.favorite) {
                        addLocalStorageFavorites(favJob);
                    } else {
                        removeLocalStorageFavorites(favJob);
                    }
                }
            }
        },
        fetchFavorites: (state) => {
            state.favArr = readLocalStorageFavorites();
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.pending, (state) => {
            state.status = 'loading';
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
            state.status = 'succeeded';
            })
            .addCase(fetchJobs.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error?.message ?? 'Something went wrong';
            });
        },
})

export const { setJobs, appendJobs, setFavorite, fetchFavorites } = jobsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectJobs = (state: RootState) => state.jobs.jobsArr
export const selectFavorites = (state: RootState) => state.jobs.favArr

export default jobsSlice.reducer
