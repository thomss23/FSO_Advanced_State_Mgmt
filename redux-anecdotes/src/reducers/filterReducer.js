import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filteredSearch: '',
}
const filterSlice = createSlice({
    name:'filter',
    initialState,
    reducers: {
        addToFilter(state, action) {
            state.filteredSearch = action.payload
        }
    }
})

export const filterReducer = filterSlice.reducer
export const { addToFilter } = filterSlice.actions
