import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { is } from "zod/locales";



function SignedInPage() {
    const [mood, setMood] = useState(null);
    return(
        <>
        <div className="h-1/9 border-4 border-red-200 shadow-lg mt-2 pb-0 rounded-lg w-4/6 flex flex-row align-center justify-start mx-auto">
        <Link to="/journal/new" className="button m-4">Today</Link>
        <Link to="/journal/view" className="button m-4">Journal</Link>
        <Link to="/journal/settings" className="button m-4">Insights</Link>
        
        </div>
        <div className="w-5/6 h-fit flex flex-col text-center pt-10 border-4 border-red-200 shadow-lg mt-4 p-0 rounded-lg mx-auto">
            <h1 className="text-2xl font-bold">How are you feeling today?</h1>
            <p className="text-sm mt-3">Select your current mood to track your emotional journey.</p>
            <div className="flex justify-center mt-6 space-x-3">
                <button onClick={() => setMood("very low")} className="feeling-button flex flex-col items-center">
                    {mood === "very low" && <span className="selected-indicator"></span>}
                    <p>😞</p>
                    <p>Very Low</p>
                </button>
                <button onClick={() => setMood("low")} className="feeling-button flex flex-col items-center">
                    {mood === "low" && <span className="selected-indicator"></span>}
                    <p>😞</p>
                    <p>Low</p>
                </button>
                <button onClick={() => setMood("neutral")} className="feeling-button flex flex-col items-center">
                    {mood === "neutral" && <span className="selected-indicator"></span>}
                    <p>😐</p>
                    <p>Neutral</p>
                </button>
                <button onClick={() => setMood("good")} className="feeling-button flex flex-col items-center">
                    {mood === "good" && <span className="selected-indicator"></span>}
                    <p>😊</p>
                    <p>Good</p>
                </button>
                <button onClick={() => setMood("great")} className="feeling-button flex flex-col items-center">
                    {mood === "great" && <span className="selected-indicator"></span>}
                    <p>😊</p>
                    <p>Great</p>
                </button>
                </div>
                <div className="mt-6 flex justify-center text-center">
                   <button className="p-5 border-2 border-zen-300 flex items-center justify-center">Feeling {mood != null ? mood : "No mood selected"} today</button> 
                </div>
                
        </div>

        </>
        
    )
}
function SignedOutPage() {
    
    return(
        <>
        <div className="special-section text-center h-3/4 bg-red-100 ml-auto mr-auto">
            <h1 className="text-4xl">A trusted, safe space</h1>
            <p className="text-lg mt-3">Your personal space to relax and reflect.</p>
            <div className="flex justify-center mt-4">
                <Link to="/signup" className="button mt-4">Get Started</Link>
                <Link to="/login" className="button mt-4 ml-4">Login</Link>
            </div>
            </div>
            <div className="special-section text-center h-3/4 bg-red-100 ml-auto mr-auto">
            <h1 className="text-4xl">Accredited by many</h1>
            <p className="text-lg mt-3">Why don't you hop in?</p>
            <div className="flex justify-center mt-4">
                <Link to="/signup" className="button mt-4">Get Started</Link>
                <Link to="/login" className="button mt-4 ml-4">Login</Link>
            </div>
            </div>
        </>
    )
}

function MainHub() {
    const {isSignedIn, user, name} = useSelector((state) => state.auth);
    return(
        <div className="body">
            <div className="special-section h-1/5 ml-auto mr-auto">
            <h1 className="text-4xl">{isSignedIn ? `Welcome back, ${user.user.name}` : "Welcome to ZenJournal"}</h1>
            <p className="text-lg mt-3">{isSignedIn ? `How are you feeling today? Take a moment to reflect and write.` : "Your place to relax and reflect."}</p>
            </div>
            {isSignedIn ? <SignedInPage /> : <SignedOutPage />}
          </div>  
    )
}

export default MainHub;