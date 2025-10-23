import { Link } from "react-router-dom";


function Navbar() {
    return(
        <nav className="bg-red-100 flex flex-row h-20 items-center shadow-md">
            <div className="flex flex-col cursor-pointer p-2 text-center">
            <h1 className="text-2xl">ZenJournal</h1>
            <p className="text-xs">Your place to relax</p>
            </div>
            <div className="ml-auto mr-4">
                <Link to="/signup" className="mr-4 bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition duration-300">Sign Up</Link>
                <Link to="/login" className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition duration-300">Login</Link>
            </div>
        </nav>
        )
}

export default Navbar;