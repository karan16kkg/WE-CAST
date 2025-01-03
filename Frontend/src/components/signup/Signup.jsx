import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Signup.css"
import { UserContext } from '../../App'

const Signup = () => {

  
  useEffect(() => {
    axios.get('https://weather-xj16.onrender.com/user/signup')
    .then((response) => {
      // Cookies.set("User", response.data);
      console.log(response.data);
    })
  }, [])
  
  
  const {state, dispatch} = useContext(UserContext)
  const [form, setform] = useState({ name: "", email: "", password: "" })
  const [action, setaction] = useState("Login")

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  }

  const navigate = useNavigate()
  const handleSubmit = () => {
    axios.post("https://weather-xj16.onrender.com/user/signup", form)
      .then((response) => {
        const x = response.data;
        console.log(x);
        // Cookies.set("User", response.data);
        toast(x, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        if (x.includes("user added successfully")) {
          setTimeout(() => {
            setaction("Login")
          }, 3500);
          setform({ name: "", email: "", password: "" })
        }
      })
  }

  const handleLogin = () => {
    axios.post("https://weather-xj16.onrender.com/user/login", form)
      .then((response) => {
        // Cookies.set("User", response.data);
        const x = response.data
        toast(x, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        if (x.includes("Login successfully")) {
          dispatch({type:"USER", payload:true})
          setTimeout(() => {
            navigate("/")
            setform({name:"",email:"",password:""})
          }, 3500);
        }
        console.log(response.data);
      })
  }
  
  const handleForgot = ()=>{
    navigate("/forgot")
  }
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <div className='main flex items-center justify-center absolute h-full md:absolute w-full md:h-full'>
          <div className='w-fit border-2 border-blue-950 p-6 rounded-xl shadow-slate-900 shadow-md'>
            <h1 className='text-4xl font-bold'>{action}</h1>
            {action === "Login" ? <div className='text-red-500'>Don't have an account?<button className='text-black' onClick={() => { setaction("Sign up") }} >Create Account</button></div> : <div className='text-red-500'>Already have an account?<button className='text-black' onClick={() => { setaction("Login") }}>Login here</button></div>}

            {action === "Sign up" ? <div className='mt-5'>
              <label className='text-xl ml-2'>Name</label><br />
              <input value={form.name} className='w-80 h-14 rounded-lg bg-transparent outline-none border-2 border-slate-700 px-3 text-xl placeholder:text-gray-600' placeholder='Enter name...' type="text" name="name" onChange={handleChange} />
            </div> : <div></div>}

            <div className='mt-3'>
              <label className='text-xl ml-2'>Email Address</label><br />
              <input value={form.email} className='w-80 h-14 rounded-lg bg-transparent outline-none border-2 border-slate-700 px-3 text-xl placeholder:text-gray-600' placeholder='Enter email...' type="email" name="email" onChange={handleChange} />
            </div>

            <div className='mt-3'>
              <div className='flex justify-between'>
                <label className='text-xl ml-2'>Password</label>
                {action === "Login" ? <button className='text-red-600' onClick={handleForgot}>Forgot password?</button> : <div></div> }
              </div>
              <input value={form.password} className='w-80 h-14 rounded-lg bg-transparent outline-none border-2 border-slate-700 px-3 text-xl placeholder:text-gray-600' placeholder='Enter password...' type="password" name="password" onChange={handleChange} />
            </div>

            <div>
              {action === "Sign up" ? <button className='border border-white mt-5 w-2/3 ml-14 h-10 text-white rounded-xl bg-slate-800' onClick={handleSubmit}>Sign up</button> : <button className='border border-white mt-5 w-2/3 ml-14 h-10 text-white rounded-xl bg-slate-800' onClick={handleLogin}>Login</button>}
            </div>
          </div>
        </div>
    </>
  )
}

export default Signup
