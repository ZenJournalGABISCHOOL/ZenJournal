import { Link } from "react-router-dom";


function Navbar() {
    return(
        <nav className="bg-red-100 flex flex-row h-20 items-center shadow-md">
            <Link to="/" className="ml-4">
            <div className="flex flex-col cursor-pointer p-2 text-center">
            <h1 className="text-2xl">ZenJournal</h1>
            <p className="text-xs">Your place to relax</p>
            </div>
            </Link>
            
            <div className="ml-auto mr-4">
                <Link to="/signup" className="mr-4 button">Sign Up</Link>
                <Link to="/login" className="button">Login</Link>
            </div>
        </nav>
        )
}

export default Navbar;