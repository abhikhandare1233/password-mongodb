import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './component/Navbar'
import Manager from './component/Manager'
import Footer from './component/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <div className='min-h-[85vh]  md:min-h-[91vh] w-full'>
    <Manager/>
    </div>
    <Footer/>
    </>
  )
}

export default App
