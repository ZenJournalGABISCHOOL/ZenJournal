import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addEntry, getAllJournals, findJournalById, updateEntry, deleteEntry } from "../store/slices/JournalSlice";
import JournalForm from "./JournalForm";
import JournalList from "./JournalList";
import { set } from "zod";

export default function JournalPage() {
  const dispatch = useDispatch();
  const { entries, loading, error } = useSelector(state => state.journal);
  const [editing, setEditing] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);

  const deleteAllEntries = async () => {
    if (window.confirm('Are you sure you want to delete all journal entries? This action cannot be undone.')) {
      try {
        await Promise.all(entries.map(entry => dispatch(deleteEntry(entry._id)).unwrap()));
        console.log('All entries deleted successfully.');
        window.alert('All journal entries have been deleted.');
      } catch (error) {
        console.error('Failed to delete all entries:', error);
      }
    }
  };

  // Effect to handle initial loading
  useEffect(() => {
    const loadJournals = async () => {
      try {
        setIsLoaded(false);
        await dispatch(getAllJournals()).unwrap();
        console.log("Journals loaded:", entries);
        setIsLoaded(true);
      } catch (error) {
        console.error('Failed to load journals:', error);
        setIsLoaded(true); // Still set to true to show the UI
      }
    };
    
    loadJournals();
  }, [dispatch]);

  
  if (!isLoaded) {
    return (
      <div className="journal-form-container">
        <div className="text-center p-4">
          <p className="text-lg">Loading your journal entries...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="journal-form-container">
        <div className="text-center p-4">
          <p className="text-lg text-red-500">Error loading journal entries: {error?.message || 'Unknown error'}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="journal-form-container">
        <div className="flex mb-4">
          <button onClick={deleteAllEntries} className="button">Delete all entries</button>
        </div>
      <div className="flex justify-between items-center mb-4">
        
        <h2 className="text-2xl font-bold">Write your journal!</h2>
      </div>
      
      {entries.length > 0 && (
        <p className="text-sm text-gray-600 mb-4">
          You have {entries.length} journal {entries.length === 1 ? 'entry' : 'entries'}.
        </p>
      )}
      
      <JournalForm/>
      <JournalList entries={entries}/>
    </div>
    </>
  );
}
