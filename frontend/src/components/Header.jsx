import React from 'react'
import {Link} from 'react-router-dom'

function Header() {
  return (
    <div className='bg-purple-800 py-6'>
      <div className='flex justify-between mx-auto container'>
      <span className='text-white font-semibold text-3xl tracking-tight'><Link to="/">Hotelo.com</Link></span>
      <span><Link to="/sign-in" className='flex bg-white items-center text-purple-600 p-3 font-bold rounded-md hover:bg-purple-800 hover:text-white'>Sign in</Link></span>
      </div>

    
    </div>
  )
}

export default Header
