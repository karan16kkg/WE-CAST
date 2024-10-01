import React from 'react'
import "./Tempapp.css"
import { useState,useEffect } from 'react'
import Navbar from '../navbar/Navbar';
import Footer from '../Footer';
import axios from 'axios'
const Tempapp = () => {
  const [data, setdata] = useState({ country: "" });
  const [city, setcity] = useState("")
  const [temp,settemp] = useState("")
  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value })
    setcity(e.target.value);  
  }
  let z = data.country;

  console.log(city);
  console.log(temp);
  const getdata = async()=>{
    setcity(z);
    console.log(city);
    await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a322d39c25aa93e12bfe3ff1a6c68891`)
    .then((response)=>{
      let x=response.data;
      console.log(x);
      let y = Math.round(x.main.temp - 273);
      console.log(y);
      settemp(y)
    })
  }

  const handleKey = (e) =>
  {
    if (e.key == 'Enter')
    {
      getdata();
    }
  }
  return (
    <>
      <Navbar />
      <div id='home' className='h-screen'>
        <div className='mt-14 h-14 items-center stati justify-center flex h-fit'>
          <input value={data.country} className='w-1/3 h-12 text-xl rounded-full px-5 border-2 border-purple-500 outline-none ml-28 mt-8' placeholder='Search city..' type="search" name="country" onKeyDown={handleKey} onChange={handleChange} />
          <button className='text-white text-3xl border border-purple-700 rounded-l-full rounded-r-full px-4 h-12 bg-purple-500 mt-8' onClick={getdata}>Search</button>
        </div>
        <div className='text-white absolote flex flex-col items-center mt-10'>
          <h1 className='top-80 text-9xl'>{temp}°C</h1>
          <p className='top-140 text-5xl'>{city}</p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Tempapp