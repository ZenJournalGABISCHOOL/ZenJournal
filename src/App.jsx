import { useState } from 'react'
import { Routes, Router, Route, BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import MainHub from './pages/mainHub'
import { Provider } from 'react-redux'
import LoginPage from './pages/loginPage'
import SignUpPage from './pages/signUp'
import zenJournalStore from './store/index4Store'
function App() {
        return(
        <>
        <Navbar /> 
                     
            <Routes>
                <Route path="/" element={<MainHub />}></Route>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/signup" element={<SignUpPage />}></Route>
            </Routes>
        
        
        </>
                
                
            
        )
}

export default App