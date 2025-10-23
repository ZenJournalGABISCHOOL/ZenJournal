import { useState } from 'react'
import { Routes, Router, Route, BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import MainHub from './pages/mainHub'
function App() {
    return(
    <BrowserRouter>
    <Navbar />       
    <Routes>
    <Route path="/" element={<MainHub />}></Route>
    </Routes>
    </BrowserRouter>
 


    )


  
  
}

export default App