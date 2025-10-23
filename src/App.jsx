import { useState } from 'react'
import { Routes, Router, Route, BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
function App() {
    return(
    <BrowserRouter>
    <Navbar />       
    <Routes>
    <Route path="/" element={<h1>Hello!</h1>}></Route>
    </Routes>
    </BrowserRouter>
 


    )


  
  
}

export default App