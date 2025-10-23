import { Link } from "react-router-dom";



function MainHub() {
    return(
        <div className="flex flex-col items-center h-screen bg-yellow-100">
            <div className="text-center border-2 border-red-300 p-10 rounded-lg shadow-lg bg-white w-full h-1/2 flex flex-col justify-center">
            <h1 className="text-4xl">Welcome to ZenJournal</h1>
            <p className="text-lg">Your personal space to relax and reflect.</p>
            <Link to="/signup" className="button mt-4 self-center">Get Started</Link>
            </div>
            
        </div>
    )
}

export default MainHub;