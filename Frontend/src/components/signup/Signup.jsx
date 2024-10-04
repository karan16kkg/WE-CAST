import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import "./Signup.css"
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Signup = () => {

  useEffect(() => {
    axios.get('https://weather-xj16.onrender.com/user/signup')
      .then((response) => {
        // Cookies.set("User", response.data);
        console.log(response.data);
      })
  }, [])


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
          setTimeout(() => {
            navigate("/")
            setform({name:"",email:"",password:""})
          }, 3500);
        }
        console.log(response.data);
      })
  }
  console.log(form.name);
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
      <div className='border border-black h-screen'>
        <div className='data w-1/2 border border-red-600'>
          <div className='w-1/4 absolute top-40 left-40'>
            <h1 className='text-4xl font-bold mb-1'>{action}</h1>
            {action === "Login" ? <div className='text-red-400'>Don't have an account?<button className='text-black' onClick={() => { setaction("Sign up") }} >Create Account</button></div> : <div className='text-red-400'>Already have an account?<button className='text-black' onClick={() => { setaction("Login") }}>Login here</button></div>}

            {action === "Sign up" ? <div className='mt-5'>
              <label>Name</label><br />
              <input value={form.name} className='w-80 h-10 rounded-lg bg-transparent outline-none border border-blue-500 px-3' type="text" name="name" onChange={handleChange} />
            </div> : <div></div>}

            <div className='mt-3'>
              <label>Email Address</label><br />
              <input value={form.email} className='w-80 h-10 rounded-lg bg-transparent outline-none border border-blue-500 px-3' type="email" name="email" onChange={handleChange} />
            </div>

            <div className='mt-3'>
              <label>Password</label><br />
              <input value={form.password} className='w-80 h-10 rounded-lg bg-transparent outline-none border border-blue-500 px-3' type="password" name="password" onChange={handleChange} />
            </div>

            <div>
              {action === "Sign up" ? <button className='border border-white mt-5 w-2/3 ml-10 h-10 text-white rounded-xl bg-slate-800' onClick={handleSubmit}>Sign up</button> : <button className='border border-white mt-5 w-2/3 ml-10 h-10 text-white rounded-xl bg-slate-800' onClick={handleLogin}>Login</button>}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup
