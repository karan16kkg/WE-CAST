import { createContext, useReducer } from 'react'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Tempapp from './components/temp/Tempapp'
import Signup from './components/signup/Signup'
import Forgot from './components/signup/Forgot'
import { initialState,reducer } from './reducer/UseReducer'


export const UserContext = createContext();
function App () {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <>
    <UserContext.Provider value={{state, dispatch}}>
    <Routes>
      <Route path="/" element={<Tempapp/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/forgot' element={<Forgot/>}/>
    </Routes>
    </UserContext.Provider>
    </>
  )
}

export default App
