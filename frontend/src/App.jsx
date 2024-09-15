import React from 'react'
import Login from './pages/login/login'
import Signup from './pages/signup/Signup'
import Home from './pages/home/home'

function App() {
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      {/* <Signup/> */}
      <Home/>
    </div>
  )
}

export default App