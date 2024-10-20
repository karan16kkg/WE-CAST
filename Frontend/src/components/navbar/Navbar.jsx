import React, { useEffect,useContext } from 'react'
import { useState } from 'react'
import {HashLink as Link} from 'react-router-hash-link'
import { Route, useNavigate } from 'react-router-dom'
import "./Navbar.css"
import { UserContext } from '../../App'

const Navbar = () => {

  const {state, dispatch} = useContext(UserContext)

  const [going, setgoing] = useState("home")
  const [loggedVal, setloggedVal] = useState("");
  const navigate = useNavigate()

  const handleLogin = ()=>{
    navigate("/signup")
  }

  console.log(state)

  useEffect(() => {
    if(state){
      setloggedVal("yes")
    }
  }, [state])
  

  return (
    <div className='flex justify-between fixed items-center w-full top-0 bg-slate-800'>
      <div className='flex m-2 w-fit items-center ml:2 md:ml-10'>
        <img className='h-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK3j-M3aoAjrvqoVKv1ltOJFVYDrIQAF1cfg&s" alt="Weather App" />
        <span className='text-purple-700 font-semibold text-2xl'>WE</span>
        <span className='text-gray-400 text-2xl'>CAST</span>
      </div>

      <div className='hidden md:flex gap-16 list-none'>
        <ul className='flex gap-10 text-2xl text-white'>
          <li className='hover:text-purple-600'>
            <Link smooth onClick={()=>{setgoing("home")}} to="#home" className={going==="home"?"active":""}>Home</Link>
          </li>
          <li className='hover:text-purple-600'>
            <Link onClick={()=>{setgoing("about")}} smooth  to="/about" className={going==="about"?"active":""} >About</Link>
          </li>
          <li className='hover:text-purple-600'>
            <Link onClick={()=>{setgoing("contact")}} smooth to="#contact" className={going==="contact"?"active":""} >Contact Us</Link>
          </li>
        </ul>
      </div>

      <div className='mr-5 md:mr-10 text-white'>
        {loggedVal != "yes"?<button className='border border-white text-3xl px-3 py-1 rounded-l-full rounded-r-full' onClick={handleLogin}>Login</button>:
        <div>
          <img className='border-2 rounded-full p-2 ' src="/user.svg" alt="" />
        </div>}
      </div>
      
    </div>
  )
}

export default Navbar