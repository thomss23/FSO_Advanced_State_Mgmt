import { addVote, upvoteAnecdote } from '../reducers/anecdoteReducer'
import {addNotificationMessage, setNotification} from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'


const AnecdoteList = (props) => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const handleVoting = (anecdote) => {
      dispatch(upvoteAnecdote(anecdote))
      dispatch(setNotification("You voted for " + anecdote.content, 5000))
    }

    return (
    <>
        {anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.filteredSearch.toLowerCase())).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVoting(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
    )
} 

export default AnecdoteList