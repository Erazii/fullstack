import { createSlice} from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name:'filter',
    initialState: '',
    reducers: {
        filterChange(state, action){
            const payload = action.payload
            return  payload
        }
    }
})

export const { filterChange } = filterSlice.actions

export default filterSlice.reducer