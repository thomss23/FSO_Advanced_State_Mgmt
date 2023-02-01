import { configureStore } from '@reduxjs/toolkit'
import { anecdoteReducer } from './reducers/anecdoteReducer'
import { filterReducer } from './reducers/filterReducer'
import { notifcationReducer } from './reducers/notificationReducer'


const store = configureStore({
    reducer: {
      anecdotes: anecdoteReducer,
      notification: notifcationReducer,
      filter:filterReducer
    }
})

export default store