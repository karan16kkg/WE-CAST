import React from 'react'
import "./Tempapp.css"
import { useState } from 'react'
import Navbar from '../navbar/Navbar';
import Footer from '../Footer';
import axios from 'axios'
const Tempapp = () => {
  const [data, setdata] = useState({ country: "" });
  const [city, setcity] = useState("")
  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value })
  }
  let x = data.country;
  console.log(x);

  const getdata = async()=>{
    setcity(x);
    await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a322d39c25aa93e12bfe3ff1a6c68891`)
    .then((response)=>{
      console.log(response);
    })
  }
  return (
    <>
      <Navbar />
      <div id='home' className='border border-black h-screen'>
        <div className='mt-20'>
          <input value={data.country} className='w-1/2 h-12 text-xl rounded-full px-5 absolute left-1/4 border-2 border-purple-500 outline-none' type="search" name="country" onChange={handleChange} />
        </div>
        <button onClick={getdata} className='text-white'>hello</button>
      </div>
      <Footer />
    </>
  )
}

export default Tempapp