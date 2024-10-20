import React from 'react'
import "./Tempapp.css"
import { useState, useEffect } from 'react'
import Navbar from '../navbar/Navbar';
import Footer from '../Footer';
import axios from 'axios'

const image = [
  '/cloudy.jpg',
  '/rainy.jpg',
  '/clear.jpg'
]
const Tempapp = () => {
  let x;
  const key = "a322d39c25aa93e12bfe3ff1a6c68891"
  const city = "chandigarh"
  const [data, setdata] = useState({ city: "" })
  const [background, setbackground] = useState();
  const [temp, settemp] = useState({ name: "", tempe: "", wind: "", humidity: "" })
  const [bg, setbg] = useState("Clear")
  const [latitude, setlatitude] = useState("")
  const [longitude, setlongitude] = useState("")

  useEffect(() => {
    const fun = async () => {
      await navigator.geolocation.getCurrentPosition((position) => {
        setlatitude(position.coords.latitude)
        setlongitude(position.coords.longitude)
      })
    }
    fun();
  }, [])


  useEffect(() => {
    const fun1 = async () => {
      if (latitude && longitude) {
        let finalApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=a322d39c25aa93e12bfe3ff1a6c68891`
        await axios.get(finalApi)
          .then((response) => {
            x = response.data
            setbg(x.weather[0].main)

            settemp({
              name: x.name,
              tempe: (x.main.temp - 273).toFixed(0),
              wind: (x.wind.speed * 3.6).toFixed(2),
              humidity: x.main.humidity
            })
          })
      }
    }

    fun1()
  }, [latitude, longitude])

  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  }

  const handleKey = (e) => {
    if (e.key == 'Enter') {
      getData();
    }
  }

  // let x;
  const getData = async () => {
    await axios.post('https://weather-xj16.onrender.com/api', data)
      .then((response) => {
        // console.log(response.data.city.name);
        x = response.data
      })
    console.log(x);
    setbg(x.weather[0].main)
    settemp({
      name: x.name,
      tempe: (x.main.temp - 273).toFixed(0),
      wind: (x.wind.speed * 3.6).toFixed(2),
      humidity: x.main.humidity
    })
  }

  useEffect(() => {
    if (bg == "Clouds") {
      setbackground([image[0]]);
    }
    if (bg == "Rain") {
      setbackground([image[1]])
    }
    if (bg == "Clear") {
      setbackground([image[2]])
    }
  }, [bg])


  return (
    <>
      <Navbar />
      <div id='home' className='h-screen mt-14' style={{ backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className='flex justify-center'>
          <input value={data.city} className='h-12 w-2/3 md:w-1/3 outline-none rounded-full text-3xl px-8 mt-10 border-2 border-slate-600 shadow-slate-800 shadow-xl' type="search" name="city" placeholder='Search City...' onChange={handleChange} onKeyDown={handleKey} />
          <button className='text-white mt-10 bg-gray-900 rounded-full text-2xl w-24 shadow-black drop-shadow-xl' onClick={getData}>Search</button>
        </div>

        <div className='md:flex mt-8 w-full justify-between'>
          <div className='px-5 w-full flex flex-col items-center pb-8'>
            <h1 className=' text-5xl md:text-7xl mt-10'>{temp.name}</h1>
            <div className='border flex flex-col mt-16 bg-white gap-2 p-3 rounded-lg'>
              <div className='flex items-center text-xl'>
                <img className='border p-2 bg-stone-300 rounded-xl' src="/wind.svg" alt="" />
                <span className=' ml-4'>Wind {temp.wind}km/h</span>
              </div>
              <div className='flex items-center text-xl'>
                <img className='border p-2 bg-stone-300 rounded-xl' src="/humidity.svg" alt="" />
                <span className=' ml-4'>Humidity {temp.humidity}%</span>
              </div>
            </div>
          </div>
          <div className='flex justify-center w-full items-center'>
            <h1 className='text-9xl'>
              {temp.tempe}
              <sup className='text-7xl ml-2'>°C</sup>
            </h1>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  )
}

export default Tempapp

