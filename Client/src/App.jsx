import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import EmailVerify from './pages/EmailVerify.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function App() {
  return (
    <>
      <BrowserRouter>
      <ToastContainer/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/email-verify' element={<EmailVerify/>}/>
          <Route path='/reset-password' element={<ResetPassword/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App