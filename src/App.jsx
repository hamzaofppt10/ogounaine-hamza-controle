import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Navbar from './Navbar'

const App = () => {
  return (
    <BrowserRouter>
    <Navbar />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='about' element={<h1>About</h1>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App