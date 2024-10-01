import { useState } from 'react'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Tempapp from './components/temp/Tempapp'
import Navbar from './components/navbar/Navbar'
import Footer from './components/Footer'
import About from './components/About'
import Signup from './components/signup/Signup'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/' element={<Tempapp/>}/>
      <Route path='/nav' element={<Navbar/>} />
      <Route path='/contact' element={<Footer/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/signup' element={<Signup/>} />
    </Routes>
    </>
  )
}

export default App
