import { Link, useNavigate} from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import { checkForRegistration, logout, logoutImmediate } from "../store/slices/authSlice";
import { initialState } from "../store/slices/authSlice";




function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isSignedIn, user, name} = useSelector((state) => state.auth);
    console.log(user, initialState);
    

    const handleLogout = async() => {
        try {
            // Try API logout first
            await dispatch(logout()).unwrap();
        } catch (error) {
            console.error("API logout failed, using immediate logout:", error);
            // If API logout fails, use immediate logout
            dispatch(logoutImmediate());
        } finally {
            // Always navigate to login page
            navigate("/login");
        }
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
                <p className="mr-4">Hello, {name}</p>
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