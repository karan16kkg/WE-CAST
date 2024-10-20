import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import "./Forgot.css"
const Forgot = () => {

  useEffect(() => {
    axios.get("https://weather-xj16.onrender.com/user/login")
      .then((response) => {
        console.log(response.data);
      })
  }, [])


  const [form, setform] = useState({ email: "", password: "", confirm: "" });

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  let navigate = useNavigate()
  const handleSubmit = () => {
    axios.post("https://weather-xj16.onrender.com/user/forgot", form)
      .then((response) => {
        let x = response.data;
        toast(x, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });

        if(x.includes("Password change successfully")){
          setInterval(() => {
            navigate("/signup");
          }, 3000);
        }
      })
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
      <div className='main2 flex justify-center items-center absolute h-full w-full'>
        <div className='border border-black p-6 flex flex-col rounded-lg shadow-md shadow-slate-800'>
          <h1 className='text-3xl font-bold mb-8'>Forgot Password</h1>

          <div>
            <label className='text-xl'>Email</label><br />
            <input value={form.email} className='w-80 h-14 border border-black bg-transparent px-4 outline-none rounded-md text-xl placeholder:text-gray-400' placeholder='Enter email...' type="email" name="email" onChange={handleChange} />
          </div>

          <div className='mt-4'>
            <label className='text-xl'>Password</label><br />
            <input value={form.password} className='w-80 h-14 border border-black bg-transparent px-4 outline-none rounded-md text-xl placeholder:text-gray-400' placeholder='Enter password...' type="password" name="password" onChange={handleChange} />
          </div>

          <div className='mt-4'>
            <label className='text-xl'>Confirm Password</label><br />
            <input value={form.confirm} className='w-80 h-14 border border-black bg-transparent px-4 outline-none rounded-md text-xl placeholder:text-gray-400' placeholder='Confirm password...' type="password" name="confirm" onChange={handleChange} />
          </div>
          <button className='mt-5 w-1/2 ml-20 h-10 rounded-xl bg-slate-700 text-white border border-white ' onClick={handleSubmit}>Change Password</button>
        </div>
      </div>
    </>
  )
}

export default Forgot