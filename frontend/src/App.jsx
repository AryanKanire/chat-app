import React  from 'react'
import Login from './pages/login/login'
import Signup from './pages/signup/Signup'
import Home from './pages/home/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import { useAuthcontext } from './context/Authcontext'

function App() {
  const {authuser} = useAuthcontext();
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route path='/' element={authuser ?<Home/> :<Navigate to='/login'/>}/>
        <Route path='/login' element={authuser ? <Navigate to='/'/> :<Login/>}/>
        <Route path='/signup' element={authuser ? <Navigate to='/'/> : <Signup/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App