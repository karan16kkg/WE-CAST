import React from 'react'
import "./Tempapp.css"
import { useState, useEffect } from 'react'
import Navbar from '../navbar/Navbar';
import Footer from '../Footer';
import axios from 'axios'

const image = [
  '/cloudy.jpg',
  '/rainy.jpg',
  '/clear.jpg',
  'sun.svg',
  'cloudy_sun.png'
]
const Tempapp = () => {
  let x;
  const [data, setdata] = useState({ city: "" })
  const [background, setbackground] = useState();
  const [Sun, setSun] = useState()
  const [temp, settemp] = useState({ name: "", tempe: "", wind: "", humidity: "",clouds:"",visibility:"" })
  const [bg, setbg] = useState("Clear")
  const [latitude, setlatitude] = useState("")
  const [longitude, setlongitude] = useState("")
  const [clr, setclr] = useState("")
  const [Time, setTime] = useState(new Date().toLocaleTimeString())

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
              humidity: x.main.humidity,
              clouds:x.clouds.all,
              visibility:(x.visibility/1000).toFixed(1)
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
        x = response.data
      })
    console.log(x);
    setbg(x.weather[0].main)
    settemp({
      name: x.name,
      tempe: (x.main.temp - 273).toFixed(0),
      wind: (x.wind.speed * 3.6).toFixed(2),
      humidity: x.main.humidity,
      clouds:x.clouds.all,
      visibility:(x.visibility/1000).toFixed(1)
    })
  }

  useEffect(() => {
    if (bg == "Clouds") {
      setbackground([image[0]]);
      setSun([image[4]])
      setclr("#000000")
    }
    if (bg == "Rain") {
      setbackground([image[1]])
      setSun("");
      setclr("#D3D3D3")
    }
    if (bg == "Clear") {
      setbackground([image[2]])
      setSun([image[3]])
      setclr("#DDA84C")
    }
  }, [bg])

  useEffect(()=>{
    const timer = setTimeout(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000);

    return () => clearInterval(timer);
  })

  return (
    <>
      <Navbar />
      <div id='home' className='h-full md:h-screen w-screen mt-14' style={{ backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>

        <div className='block md:flex w-full'>
          <div className='text-white flex relative w-full md:w-1/2 z-0'>
            <img className='h-52 ml-10 mt-5' src={Sun} alt="" />
            <h1 className='text-9xl mt-5 absolute left-40 top-6'>
              {temp.tempe}
              <sup className='text-7xl ml-2'>°C</sup>
            </h1>
          </div>

          <div className='md:w-1/2 text-white flex flex-col items-center'>
            <h1 className=' text-5xl md:text-8xl mt-10'>{temp.name}</h1>
            <p className='text-3xl'>{new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}</p>
          </div>
        </div>

        <div className='flex flex-col items-center w-full mt-10 md:mt-0'>
          <div className='w-2/3 md:w-2/4'>
            <h1 className=' italic text-white text-5xl font-bold'>WE CAST</h1>
          </div>
          <div className='w-3/4 md:w-2/4 flex relative'>
            <input value={data.city} className='w-full h-14 rounded-md text-2xl italic pl-5 text-white placeholder-white outline-none border-none' style={{backgroundColor:clr}} type="search" name="city" placeholder='Search City...' onChange={handleChange} onKeyDown={handleKey} />
            <img className='absolute right-3 top-3 cursor-pointer' onClick={getData} src="search.svg" alt="" />
          </div>
        </div>

        <div className='mt-24 block md:flex'>
          <div className='w-full md:w-1/2 flex items-center justify-center'>
            <h1 className='text-5xl md:text-7xl text-white font-bold'>{Time}</h1>
          </div>

          <div className='w-full md:w-1/2'>
            <div className='flex'>
              <div className='text-white w-1/2 flex flex-col items-center'>
                <h1 className='text-3xl md:text-5xl font-bold'>WIND</h1>
                <p className='text-xl font-bold'>{temp.wind} km/h</p>
              </div>
              <div className='text-white w-1/2 flex flex-col items-center'>
                <h1 className='text-3xl md:text-5xl font-bold'>HUMIDITY</h1>
                <p className='text-xl font-bold'>{temp.humidity} %</p>
              </div>
            </div>
            
            <div className='flex'>
              <div className='text-white w-1/2 flex flex-col items-center'>
                <h1 className='text-3xl md:text-5xl font-bold'>CLOUDS</h1>
                <p className='text-xl font-bold'>{temp.clouds} %</p>
              </div>
              <div className='text-white w-1/2 flex flex-col items-center'>
                <h1 className='text-3xl md:text-5xl font-bold'>VISIBILITY</h1>
                <p className='text-xl font-bold'>{temp.visibility} %</p>
              </div>
            </div>

          </div>
        </div>

      </div>
      {/* <Footer /> */}
    </>
  )
}

export default Tempapp

