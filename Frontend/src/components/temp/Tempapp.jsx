import React from 'react'
import "./Tempapp.css"
import { useState } from 'react'
import Navbar from '../navbar/Navbar';
import Footer from '../Footer';
const Tempapp = () => {
  const [data, setdata] = useState({ country: "" });
  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value })
  }
  console.log(data.country);
  return (
    <>
    <Navbar/>
      <div id='home' className='border border-black h-screen'>
        <div className='mt-20'>
          <input value={data.country} className='w-1/2 h-12 text-xl rounded-full px-5 absolute left-1/4 border-2 border-purple-500 outline-none' type="search" name="country" onChange={handleChange} />
        </div>
      </div>
    <Footer/>
    </>
  )
}

export default Tempapp