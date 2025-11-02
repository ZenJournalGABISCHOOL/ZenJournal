import { useState, useEffect } from 'react'
import { checkForRegistration, registration } from './store/slices/authSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Routes, Router, Route, BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import MainHub from './pages/mainHub'
import LoginPage from './pages/loginPage'
import SignUpPage from './pages/signUp'
import JournalPage from './Feature/JournalPage'
import ProtectedRoute from './components/ProtectedRoute'
import { set } from 'zod'

function App() {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        const checkAuth = async () => {
            try {
                setLoaded(false);
                await dispatch(checkForRegistration()).unwrap();
                setLoaded(true);
            } catch (error) {
                setLoaded(true);
                console.error('Failed to check authentication:', error);
            }
        };
        
        checkAuth();
    }, [dispatch]);
    if (!loaded) {
        return( <div className="text-center p-4">
            <p className="text-lg">Loading...</p>
        </div> )
    }
    return(
        <>
        <Navbar /> 
            <Routes>
                <Route path="/" element={<MainHub />}></Route>
                <Route path="/login" element={<ProtectedRoute requireAuthentication={false}><LoginPage /></ProtectedRoute>}></Route>
                <Route path="/signup" element={<ProtectedRoute requireAuthentication={false}><SignUpPage /></ProtectedRoute>}></Route>
                <Route path="/journal" element={<ProtectedRoute requireAuthentication={true}><JournalPage /></ProtectedRoute>}></Route>
            </Routes>
        </>   
            
        )
}

export default App