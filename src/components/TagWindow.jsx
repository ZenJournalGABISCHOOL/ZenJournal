import { useState } from "react";
import { XCircleIcon } from "lucide-react";


const TagWindow = ({ allTags, filterNotes }) => {
    const [selectedTag, didHeSelectaTag] = useState("");
    const uniqueTags = Array.from(new Set(allTags));
    return (
        console.log("Rendering TagWindow with tags:", uniqueTags),
        <>
        <div className="tag-window">
            {uniqueTags.map((tag, index) => (
                <span key={index} className="tag" onClick={() => {filterNotes(tag); didHeSelectaTag(tag)}}>
                    {tag}
                </span>
            ))}
            
        </div>
        {selectedTag && <button onClick={() => {didHeSelectaTag(""); filterNotes(null)}} className="button flex flex-row">
            <XCircleIcon className="mr-2"/>
            {selectedTag}
            </button>}
        </>
        
    )
}
export default TagWindow;