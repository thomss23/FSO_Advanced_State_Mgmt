import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const StatisticLine = ({ text, value }) => 
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>

const Statistics = ({ good, neutral, bad }) => {
  const all = good+bad+neutral

  if (all===0) {
    return <>
      <h3>statistics</h3>
      <p>no feedback given</p>
    </>
  }

  const average = (good - bad ) / all
  const positive = 100 * (good / all)

  return (
    <div>
      <h3>statistics</h3>
      <table>
        <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={all} />
          <StatisticLine text='average' value={average} />
          <StatisticLine text='positive' value={positive + '%'} />
        </tbody>
      </table>

    </div>
  )
}

const Button =  ({ handleClick, label}) => <button onClick={handleClick}>{label}</button>

const App = () => {

  return (
    <>
      <h3>give feedback</h3>
      <div>
        <Button handleClick={() => store.dispatch({type: 'GOOD'}) } label='good' />
        <Button handleClick={() => store.dispatch({type: 'OK'})} label='neutral' />
        <Button handleClick={() => store.dispatch({type: 'BAD'})} label='bad' />
      </div>
      <Statistics good={store.getState().good} neutral={store.getState().ok} bad={store.getState().bad} />
    </>

  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => root.render(<App />)

renderApp()
store.subscribe(renderApp)
