import { useContext } from "react"
import { useMutation, useQueryClient } from "react-query"
import NotificationContext from "../NotificationContext"
import { createAnecdote } from "../requests"

const AnecdoteForm = () => {
  const [message, counterDispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()

  const anecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    },
    onError: () => {
      counterDispatch({type: 'ADD_NOTIF', data : 'too short anecdote'})
      setTimeout(() => {
        counterDispatch({type: 'REMOVE_MESSAGE'})
      }, 5000);
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    anecdoteMutation.mutate({content, votes: 0})

    counterDispatch({type: 'ADD_NOTIF', data : 'Added a new anecdote'})
    setTimeout(() => {
      counterDispatch({type: 'REMOVE_MESSAGE'})
    }, 5000);
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm