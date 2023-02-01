import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    message: '',
}
const notificationSlice = createSlice({
    name:'notification',
    initialState,
    reducers: {
        addNotificationMessage(state, action) {
            state.message = action.payload
        }
    }
})

export const setNotification = (message, time) => {
    return async dispatch => {
        dispatch(addNotificationMessage(message))
        setTimeout(() => {
          dispatch(addNotificationMessage(''))
        }, time);
    }
  }

export const notifcationReducer = notificationSlice.reducer
export const { addNotificationMessage } = notificationSlice.actions
