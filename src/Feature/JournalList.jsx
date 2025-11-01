import React from "react";

export default function JournalList({ entries, onEdit, onDelete }) {
  if (entries.length === 0) {
    return <p className="mt-4 font-bold text-xl">No journal entries found.</p>;
  }

  return (
    <div>
      {entries.map(entry => (
        <div key={entry.id}>
          <h4>{entry.title}</h4>
          <p>{entry.content}</p>
          <button onClick={() => onEdit(entry)}>Edit</button>
          <button onClick={() => onDelete(entry.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
