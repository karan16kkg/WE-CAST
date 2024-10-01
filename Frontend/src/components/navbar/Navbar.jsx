import React from 'react'
import { useState } from 'react'
import {HashLink as Link} from 'react-router-hash-link'
import { Route, useNavigate } from 'react-router-dom'
import "./Navbar.css"
import Signup from '../signup/Signup'
const Navbar = () => {
  const [going, setgoing] = useState("home")
  const [logged, setlogged] = useState("yes")
  const navigate = useNavigate()

  const handleLogin = ()=>{
    navigate("/signup")
  }
  return (
    <div className='flex justify-between items-center fixed w-full top-0'>
      <div className='flex m-2 w-fit items-center ml-10'>
        <img className='h-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK3j-M3aoAjrvqoVKv1ltOJFVYDrIQAF1cfg&s" alt="Weather App" />
        <span className='text-purple-700 font-semibold text-2xl'>WE</span>
        <span className='text-gray-400 text-2xl'>CAST</span>
      </div>

      <div className='flex gap-16 list-none'>
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

      <div className='mr-10 text-white'>
        {logged==="yes"?<button className='border border-white text-3xl px-3 py-1 rounded-l-full rounded-r-full' onClick={handleLogin}>Login</button>:<span>hello</span>}
      </div>
    </div>
  )
}

export default Navbar