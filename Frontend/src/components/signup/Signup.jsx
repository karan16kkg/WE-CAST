import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import "./Signup.css"
import { useNavigate } from 'react-router-dom'
const Signup = () => {

  useEffect(() => {
    axios.get('https://weather-6q3e-gysp7wjhg-karan-kumar-gargs-projects.vercel.app/user/signup')
    .then((response)=>{
      console.log(response.data);
    })
  }, [])
  

  const [form, setform] = useState({ name: "", email: "", password: "" })
  const [action, setaction] = useState("Login")

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  }

  const navigate = useNavigate()
  const handleSubmit = ()=>{
    axios.post("https://weather-6q3e-gysp7wjhg-karan-kumar-gargs-projects.vercel.app/user/signup",form)
    .then((response)=>{
      const x = response.data;
      if(x.includes("user added successfully")){
        setaction("Login")
        setform({name:"",email:"",password:""})
      }
      console.log(response.data)
    })
  }

  const handleLogin = ()=>{
    axios.post("https://weather-6q3e-gysp7wjhg-karan-kumar-gargs-projects.vercel.app/user/login",form)
    .then((response)=>{
      const x = response.data
      if(x.includes("Login successfully")){
        navigate("/")
      }
      console.log(response.data);
    })
  }
  console.log(form.name);
  return (
    <>
    <div className=''>
      <div className='data h-screen w-1/2'>
        <div className='w-1/4 absolute top-40 left-40'>
          <h1 className='text-4xl font-bold mb-1'>{action}</h1>
          {action === "Login" ?<div className='text-red-400'>Don't have an account?<button className='text-black' onClick={()=>{setaction("Sign up")}} >Create Account</button></div>:<div className='text-red-400'>Already have an account?<button className='text-black' onClick={()=>{setaction("Login")}}>Login here</button></div>}
          
          {action === "Sign up" ?<div className='mt-5'>
            <label>Name</label><br />
            <input value={form.name} className='w-80 h-10 rounded-lg bg-transparent outline-none border border-blue-500 px-3' type="text" name="name" onChange={handleChange} />
          </div>:<div></div>}
        
          <div className='mt-3'>
            <label>Email Address</label><br />
            <input value={form.email} className='w-80 h-10 rounded-lg bg-transparent outline-none border border-blue-500 px-3' type="email" name="email" onChange={handleChange} />
          </div>

          <div className='mt-3'>
            <label>Password</label><br />
            <input value={form.password} className='w-80 h-10 rounded-lg bg-transparent outline-none border border-blue-500 px-3' type="password" name="password" onChange={handleChange} />
          </div>

          <div>
            {action==="Sign up"?<button className='border border-white mt-5 w-2/3 ml-10 h-10 text-white rounded-xl bg-slate-800' onClick={handleSubmit}>Sign up</button>:<button className='border border-white mt-5 w-2/3 ml-10 h-10 text-white rounded-xl bg-slate-800' onClick={handleLogin}>Login</button>}
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default Signup
