import { Link} from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import {checkForRegistration } from "../store/slices/authSlice";
import { useEffect } from "react";



function Navbar() {
    const {isSignedIn, user, name} = useSelector((state) => state.auth);
    console.log(user);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(checkForRegistration()).unwrap();
    }, [dispatch]);
    

    const handleLogout = () => {
        // Dispatch logout action
        dispatch(logout()).unwrap();
    };

    return(
        <nav className="flex flex-row h-20 items-center shadow-md">
            <Link to="/" className="ml-4">
            <div className="flex flex-col cursor-pointer p-2 text-center hover:bg-red-200 rounded-md">
            <h1 className="text-2xl custom-color-font font-bold">ZenJournal</h1>
            <p className="text-xs custom-color-font">Write. Reflect. Grow.</p>
            </div>
            </Link>
            
            <div className="ml-auto mr-4 flex items-center">
                {isSignedIn && (
                <>
                <p className="mr-4">Hello, {user.user.name}</p>
                <Link to="/journal" className="mr-4 button">My Journal</Link>
                <Link onClick={handleLogout} className="button">Logout</Link>
                </>
                )}
                {!isSignedIn &&(
                <>
                <Link to="/signup" className="mr-4 button">Sign Up</Link>
                <Link to="/login" className="button">Login</Link> 
                </>
                )}
                
            </div>
            
        </nav>
        )
}

export default Navbar;