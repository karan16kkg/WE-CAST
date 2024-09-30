import React from 'react'
import { useState } from 'react'
const Signup = () => {
    const [form, setform] = useState({name:"",email:"",password:""})
    const [action, setaction] = useState("Sign up")

    const handleChange = (e)=>{
        setform({...form,[e.target.name]:e.target.value});
    }
    console.log(form.name);
  return (
    <div className='border border-black w-1/4'>
      <h1 className=''>{action}</h1>
      <span className='text-[#877354]'>Already have an account?<button className='text-black'>Login here</button></span>
        <div className='border border-black'>
          <label>Name</label><br/>
          <input value={form.name} type="text" name="name" onChange={handleChange} />
        </div>

        <div className='border border-black'>
          <label>Email Address</label><br/>
          <input value={form.email} type="email" name="email" onChange={handleChange} />
        </div>

        <div className='border border-black'>
          <label>Password</label><br/>
          <input value={form.password} type="password" name="password" onChange={handleChange} />
        </div>

    </div>
  )
}

export default Signup