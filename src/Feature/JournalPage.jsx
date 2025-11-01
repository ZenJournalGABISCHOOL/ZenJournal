import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addEntry, updateEntry, deleteEntry, clearAllEntries } from "../store/slices/JournalSlice";
import JournalForm from "./JournalForm";
import JournalList from "./JournalList";

export default function JournalPage() {
  const dispatch = useDispatch();
  const entries = useSelector(state => state.journal.entries);
  const [editing, setEditing] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Effect to handle initial loading
  useEffect(() => {
    // Small delay to show that data is being loaded from localStorage
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
  }, []);

  const handleAdd = (title, content) => {
    dispatch(addEntry(title, content));
  };

  const handleUpdate = (id, title, content) => {
    dispatch(updateEntry({ id, title, content }));
    setEditing(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteEntry(id));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all journal entries? This cannot be undone.')) {
      dispatch(clearAllEntries());
    }
  };

  // Export entries as JSON (useful for backup)
  const handleExportEntries = () => {
    if (entries.length === 0) {
      alert('No entries to export!');
      return;
    }
    
    const dataStr = JSON.stringify(entries, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `journal-entries-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!isLoaded) {
    return (
      <div className="journal-form-container">
        <div className="text-center p-4">
          <p className="text-lg">Loading your journal entries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="journal-form-container">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Write your journal!</h2>
        <div className="flex gap-2">
          <button
            onClick={handleExportEntries}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            disabled={entries.length === 0}
          >
            Export Entries
          </button>
          <button
            onClick={handleClearAll}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
            disabled={entries.length === 0}
          >
            Clear All
          </button>
        </div>
      </div>
      
      {entries.length > 0 && (
        <p className="text-sm text-gray-600 mb-4">
          You have {entries.length} journal {entries.length === 1 ? 'entry' : 'entries'} saved locally.
        </p>
      )}
      
      <JournalForm onAdd={handleAdd} />
      <JournalList
        entries={entries}
        onEdit={setEditing}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        editing={editing}
      />
    </div>
  );
}
