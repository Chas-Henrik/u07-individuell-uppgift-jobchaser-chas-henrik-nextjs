import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/lib/store'

// Define a type for the slice state
export type FilterState = {
    filterPosition: string;
    filterRole: string;
    filterContract: string;
    filterCity: string;
    filterRegion: string;
    filterCountry: string;
    filterHeadline: string;
}

// Define the initial state using that type
const initialState: FilterState = { 
    filterPosition: '', 
    filterRole: '', 
    filterContract: '', 
    filterCity: '', 
    filterRegion: '', 
    filterCountry: '',
    filterHeadline: ''
}

export const filterSlice = createSlice({
    name: 'filter',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setFilterPosition: (state, action: PayloadAction<string>) => {
            state.filterPosition = action.payload !== undefined ? action.payload : '';
        },
        setFilterRole: (state, action: PayloadAction<string>) => {
            state.filterRole = action.payload !== undefined ? action.payload : '';
        },
        setFilterContract: (state, action: PayloadAction<string>) => {
            state.filterContract = action.payload !== undefined ? action.payload : '';
        },
        setFilterCity: (state, action: PayloadAction<string>) => {
            state.filterCity = action.payload !== undefined ? action.payload : '';
        },
        setFilterRegion: (state, action: PayloadAction<string>) => {
            state.filterRegion = action.payload !== undefined ? action.payload : '';
        },
        setFilterCountry: (state, action: PayloadAction<string>) => {
            state.filterCountry = action.payload !== undefined ? action.payload : '';
        },
        setFilterHeadline: (state, action: PayloadAction<string>) => {
            state.filterHeadline = action.payload !== undefined ? action.payload : '';
        },
    },
})

export const { setFilterPosition, setFilterRole, setFilterContract, setFilterCity, setFilterRegion, setFilterCountry, setFilterHeadline } = filterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectFilterPosition = (state: RootState) => state.filter.filterPosition
export const selectFilterRole = (state: RootState) => state.filter.filterRole
export const selectFilterContract = (state: RootState) => state.filter.filterContract
export const selectFilterCity = (state: RootState) => state.filter.filterCity
export const selectFilterRegion = (state: RootState) => state.filter.filterRegion
export const selectFilterCountry = (state: RootState) => state.filter.filterCountry
export const selectFilterHeadline = (state: RootState) => state.filter.filterHeadline

export default filterSlice.reducer