import { useMutation, useQuery, useQueryClient } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { NotifcationContextProvider } from './NotificationContext'
import { createAnecdote, getAnecdotes } from './requests'

const App = () => {
  let anecdotes = []

  const result = useQuery('anecdotes', getAnecdotes, {
    retry: false,
    refetchOnWindowFocus: false
  })

  

  if (result.isError) {
    return(<div>anecdote service not available due to problems in the server</div>)
  } else if (result.isLoading) {
    return <>Waiting...</>
  } else {
    anecdotes = result.data
  }

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
    <NotifcationContextProvider>
      <Notification />
      <AnecdoteForm />
    </NotifcationContextProvider>
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
