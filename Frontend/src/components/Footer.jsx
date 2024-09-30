import React from 'react'

const Footer = () => {
  return (
    <>
    <div className='bg-gray-700 py-10 flex' id='contact'>
      <div className='w-1/3 ml-20'>
        <div className='flex m-2 w-fit items-center'>
          <img className='h-10 border-none rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK3j-M3aoAjrvqoVKv1ltOJFVYDrIQAF1cfg&s" alt="Weather App" />
          <span className='text-purple-700 font-semibold text-2xl'>WE</span>
          <span className='text-gray-400 text-2xl'>CAST</span>
        </div>
        <span className='text-white'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus porro voluptate harum consequuntur illum nulla aspernatur, eaque quod debitis ex.</span><br/>
        <div className='mt-5'>
          <span className='text-white text-4xl'><i class="bi bi-facebook"></i></span>
          <span className='text-white text-3xl px-1 border border-white rounded-full rounded-l-full rounded-r-full mx-4'><i class="bi bi-twitter"></i></span>
          <span className='text-white text-4xl'><i class="bi bi-linkedin"></i></span>
        </div>
      </div>

      <div className='ml-32 w-72'>
        <h1 className='font-bold text-white text-3xl'>COMPANY</h1>
        <ul className='text-white mt-4'>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
        </ul>
      </div>

      <div className='ml-32 w-72'>
        <h1 className='font-bold text-white text-3xl'>GET IN TOUCH</h1>
        <ul className='text-white mt-4'>
          <li>+1-212-456-7890</li>
          <li>contact@tomato.com</li>
        </ul>
      </div>
    </div>
    </>
  )
}

export default Footer