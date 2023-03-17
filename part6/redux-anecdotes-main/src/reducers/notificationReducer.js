import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name:'notification',
    initialState: null,
    reducers: {
        changeNotification(state, action) {
            const payload = action.payload
            return payload
        },
        removeNotification() {
            return null
        }

    }
})

export const setNotification = (content, time) => {
    return async dispatch => {
        dispatch(changeNotification(content))
        setTimeout(() => {
            dispatch(removeNotification())
        },time * 1000)
    }
}

export const { changeNotification, removeNotification } = notificationSlice.actions

export default notificationSlice.reducer