import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_NOTIF':
            return action.data
        case 'REMOVE_MESSAGE':
            return ''
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotifcationContextProvider = (props) => {
    const [message, messageDispatch] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value={[message, messageDispatch] }>
          {props.children}
        </NotificationContext.Provider>
      )
}

export default NotificationContext