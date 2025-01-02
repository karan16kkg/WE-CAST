import React from 'react'
import "./Tempapp.css"
import { useState, useEffect,useContext } from 'react'
import {HashLink as Link} from 'react-router-hash-link'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../App'

const image = [
  '/cloudy.jpg',
  '/rainy.jpg',
  '/clear.jpg',
  'sun.svg',
  'cloudy_sun.png',
  'night_clear.png',
  'night_cloudy.png',
  'night_rain.png',
  'moon.png'
]
const Tempapp = () => {

  const {state, dispatch} = useContext(UserContext)
  const [loggedVal, setloggedVal] = useState("");

  let x;
  const [data, setdata] = useState({ city: "" })
  const [background, setbackground] = useState();
  const [Sun, setSun] = useState()
  const [temp, settemp] = useState({ name: "", tempe: "", wind: "", humidity: "", clouds: "", visibility: "", current: "" })
  const [bg, setbg] = useState("Clear")
  const [latitude, setlatitude] = useState("")
  const [longitude, setlongitude] = useState("")
  const [clr, setclr] = useState("")
  const [Time, setTime] = useState(new Date().toLocaleTimeString("en-US", { hour12: false }));
  const [weatherData, setWeatherData] = useState(null);

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
              clouds: x.clouds.all,
              visibility: (x.visibility / 1000).toFixed(1),
              current: x.weather[0].main
            })
          })
          const response2 = await axios.post("https://weather-xj16.onrender.com/weather_place",
            {latitude,longitude}
          );
          // console.log(response2.data)
          setWeatherData(response2.data);
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

  const getData = async () => {
    await axios.post('https://weather-xj16.onrender.com/api', data)
      .then((response) => {
        x = response.data
      })
    setbg(x.weather[0].main)
    settemp({
      name: x.name,
      tempe: (x.main.temp - 273).toFixed(0),
      wind: (x.wind.speed * 3.6).toFixed(2),
      humidity: x.main.humidity,
      clouds: x.clouds.all,
      visibility: (x.visibility / 1000).toFixed(1),
      current: x.weather[0].main
    })

    await axios.post("https://weather-xj16.onrender.com/weather", data)
      .then((response2) => {
        setWeatherData(response2.data);
      })

  }


  useEffect(() => {
    const currentHour = parseInt(Time.split(":")[0], 10);
    if (currentHour >= 18 || currentHour < 6) {
      if (bg == "Clear") {
        setbackground([image[5]]);
        setSun([image[8]])
        setclr("#000000")
      }

      if (bg == "Clouds") {
        setbackground([image[6]]);
        setSun([image[4]])
        setclr("#000000")
      }

      if (bg == "Rain") {
        setbackground([image[7]]);
        setclr("#000000")
      }

    }
    else {
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
    }
  }, [Time, bg]);


  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(new Date().toLocaleTimeString("en-US", { hour12: false }))
    }, 1000);

    return () => clearInterval(timer);
  })

  const navigate = useNavigate()
  const handleLogin = ()=>{
    navigate("/signup")
  }

  useEffect(() => {
      if(state){
        setloggedVal("yes")
      }
    }, [state])

  return (
    <>
      <div id='home' className='sc1 h-full md:h-full w-full overflow-hidden' style={{ backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>

        <div className='block md:flex w-full'>
          <div className='text-white relative w-full md:w-1/2 z-0'>
            <div className='flex  md:h-40'>
              <img className='h-52 ml-10 mt-5' src={Sun} alt="" />
              <h1 className='text-9xl mt-5 absolute left-40 top-6'>
                {temp.tempe}
                <sup className='text-7xl ml-2'>°C</sup>
              </h1>
            </div>
            <div>
              <h1 className='text-7xl flex justify-center'>{temp.current}</h1>
            </div>
          </div>

          <div className='md:w-1/2 text-white flex flex-col items-center'>
            <h1 className=' text-5xl md:text-8xl mt-20'>{temp.name}</h1>
            <p className='text-3xl'>{new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}</p>
          </div>
        </div>

        <div className='flex flex-col items-center w-full mt-14 md:mt-40 lg:mt-24'>
          <div className='w-2/3 md:w-3/4 lg:w-2/4'>
            <h1 className=' italic text-white text-5xl font-bold'>WE CAST</h1>
          </div>
          <div className='w-full md:w-3/4 lg:w-2/4 flex relative mt-5 px-4 md:px-0'>
            <input value={data.city} className='w-full h-14 rounded-md text-2xl italic pl-5 text-white placeholder-white outline-none border-none' style={{ backgroundColor: clr }} type="search" name="city" placeholder='Search City...' onChange={handleChange} onKeyDown={handleKey} />
            <img className='absolute right-8 top-3 cursor-pointer' onClick={getData} src="search.svg" alt="" />
          </div>
        </div>

        <div className='mt-20 md:mt-24 block md:block lg:flex'>
          <div className='w-full md:w-full lg:w-1/2 flex items-center justify-center'>
            <h1 className='text-5xl md:text-7xl text-white font-bold'>{Time}</h1>
          </div>

          <div className='w-full md:w-full lg:w-1/2 mt-10 md:mt-20 lg:mt-0'>
            <div className='flex'>
              <div className='text-white w-1/2 flex flex-col items-center'>
                <h1 className='text-2xl md:text-5xl font-bold'>WIND</h1>
                <p className='text-xl font-bold'>{temp.wind} km/h</p>
              </div>
              <div className='text-white w-1/2 flex flex-col items-center'>
                <h1 className='text-2xl md:text-5xl font-bold'>HUMIDITY</h1>
                <p className='text-xl font-bold'>{temp.humidity} %</p>
              </div>
            </div>

            <div className='flex'>
              <div className='text-white w-1/2 flex flex-col items-center'>
                <h1 className='text-2xl md:text-5xl font-bold'>CLOUDS</h1>
                <p className='text-xl font-bold'>{temp.clouds} %</p>
              </div>
              <div className='text-white w-1/2 flex flex-col items-center'>
                <h1 className='text-2xl md:text-5xl font-bold'>VISIBILITY</h1>
                <p className='text-xl font-bold'>{temp.visibility} %</p>
              </div>
            </div>

          </div>
        </div>

        {loggedVal!="yes"?<div className='mt-36 mb-24 flex flex-col items-center w-full'>
          <h1 className='text-xl md:text-3xl lg:text-5xl  text-white'>Log in to access the 5-day weather forecast</h1>
          <button className='mt-28 mb-20 text-white text-3xl px-12 py-4 rounded-full' style={{ backgroundColor: clr }} onClick={handleLogin}>Login</button>
        </div>:
        <div className='sc flex mt-36 gap-5 lg:gap-10 px-10 mb-24'>
          {weatherData && weatherData.map((days, index) => {
            return <div key={index} className='text-white w-full flex flex-col items-center py-4 rounded-2xl px-5 scroll-smooth scroll-m-0' style={{ backgroundColor: clr }}>
              <div className='w-full flex justify-center'>{days.date}
              </div>
              <div className='flex text-5xl mt-5 w-full justify-center'>
                {((days.min_temp + days.max_temp)/2).toFixed(0)}
                <div className='text-2xl'>°C</div>
              </div>
              <div className='flex w-full justify-center '>
                <span>{days.min_temp}°C </span>
                -
                <span> {days.max_temp}°C</span>
              </div>

              <div className='flex mt-5 text-2xl w-full justify-center'>
                {days.weather_summary[0]}
              </div>


            </div>
          })}
        </div>
}
      </div>

    </>
  )
}

export default Tempapp

