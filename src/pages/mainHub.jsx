import { Link } from "react-router-dom";




function MainHub() {
    return(
        <div className="body">
            <div className="special-section text-center h-1/2">
            <h1 className="text-4xl">Welcome to ZenJournal</h1>
            <p className="text-lg mt-3">Your personal space to relax and reflect.</p>
            <input type="text" placeholder="What shall you write about?" className="mt-4 p-3 rounded-md w-1/2 self-center"/>
            </div>
            <div className="special-section h-1/2">
            <h1 className="text-4xl">A trusted, safe space</h1>
            <p className="text-lg mt-3">Your personal space to relax and reflect.</p>
            <div className="flex justify-start">
                <Link to="/signup" className="button mt-4">Get Started</Link>
                <Link to="/login" className="button mt-4 ml-4">Login</Link>
            </div>
            </div>
            
        </div>
    )
}

export default MainHub;