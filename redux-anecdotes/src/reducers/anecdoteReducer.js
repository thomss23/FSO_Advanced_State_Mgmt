import anecdoteService from '../services/anecdotes'


const initialState = []

const create = (anecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    data: anecdote
  }
}

const addVote = (anecdote) => {
  return {
    type: 'ADD_VOTE',
    data : anecdote
  }
}

const setAnecdotes = (anecdotes) => {
  return {
    type: 'SET_ANECDOTES',
    data : anecdotes
  }
}

const anecdoteReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'ADD_VOTE': {
      console.log(action.data)
      return state.map(an => an.id !== action.data.id ? an : action.data).sort((an1, an2) => an2.votes - an1.votes )

    }

    case 'NEW_ANECDOTE': {
      return state.concat(action.data).sort((an1, an2) => an2.votes - an1.votes )
    }

    case 'SET_ANECDOTES': {
      return action.data
    }

    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(create(newAnecdote))
  }
}

export const upvoteAnecdote = anecdote => {
  let updatedAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1
  }
  return async dispatch => {
    const returnedAnecdote = await anecdoteService.addVote(updatedAnecdote)
    console.log(returnedAnecdote)
    dispatch(addVote(returnedAnecdote))
  }
}

export { anecdoteReducer, addVote, setAnecdotes }