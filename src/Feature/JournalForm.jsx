import React, { useState } from "react";

export default function JournalForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onAdd(title, content);
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-1/2 border-2 ml-auto mr-auto">
      <input
        className="background-gray-200 p-2 mb-2 w-full rounded-md"
        placeholder="Title"
        value={title}
        onChange={e => { 
          console.log(e.target.value);
          setTitle(e.target.value)
        }}
      />
      <textarea
        placeholder="Write something..."
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button type="submit" className="button">Add</button>
    </form>
  );
}
