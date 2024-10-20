import { createContext, useReducer } from 'react'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Tempapp from './components/temp/Tempapp'
import Navbar from './components/navbar/Navbar'
import Footer from './components/Footer'
import About from './components/About'
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
      <Route path='/nav' element={<Navbar/>} />
      <Route path='/contact' element={<Footer/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/forgot' element={<Forgot/>}/>
    </Routes>
    </UserContext.Provider>
    </>
  )
}

export default App
