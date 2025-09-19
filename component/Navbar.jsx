import React from 'react'

const Navbar = () => {
  return (
    <nav className=' bg-slate-800 text-white '>
        <div className='mycontainer flex justify-between px-3 h-14 items-center py-5'>

        <div className='logo font-bold text-2xl'>
            <span className='text-green-500'>&lt;</span>
            Pass
            <span className='text-green-500'>OP/&gt;</span>
        </div>

         <button className='flex  bg-green-500 my-5 justify-center text-white items-center rounded-full  gap-2 ring-white ring-1'>
          <img className='invert w-10 p-1 ' src="icon/github.svg" alt="gitHub" />
          <span className='font-bold'>Github</span>
        </button>
        
        </div>
    </nav>
  )
}

export default Navbar
