import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { Frontpg } from './resources/FrontPage/FrontPage';
import { Navbar } from './resources/navbar/navbar';
import { Register } from './resources/Register/register';
import { Login } from './resources/Login/login';
import { Aboutus } from './resources/about/Aboutus';
import { Blogs } from './resources/Blogs/Blogs';
import { Addpost } from './resources/addpost/addpost';
import { Profile } from './resources/profile/profile';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Frontpg />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/aboutus' element={<Aboutus />} />
          <Route path='/addpost' element={<Addpost/>} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/profile' element={<Profile/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
