import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllJournals } from "../store/slices/JournalSlice";
import { deleteEntry } from "../store/slices/JournalSlice";


export default function JournalList({entries}) {
  const dispatch = useDispatch();
  // const {entries} = useSelector(state => state.journal);
  // useEffect(() => {
  //   const checkForJournals = async () => {
  //     console.log("Current journal entries:", entries);
  //     try {
  //       if (entries.length === 0) {
  //         console.log("No journal entries found.");
  //       }
  //       await dispatch(getAllJournals()).unwrap();
  //     } catch (error) {
  //       console.error("Failed to fetch journal entries:", error);
  //     }
  //   }
  //   checkForJournals();
  // }, [dispatch]);

  if (entries.length === 0) {
    return <p className="mt-4 font-bold text-xl">No journal entries found.</p>;
  }
  console.log("Rendering JournalList with entries:", entries);
  const onDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this journal entry?')) {
      try {
        console.log("Attempting to delete entry with ID:", id);
        await dispatch(deleteEntry(id)).unwrap();
        console.log("Entry deleted successfully from API");
        // Redux will automatically update the entries array in the deleteEntry.fulfilled case
      } catch (error) {
        console.error("Failed to delete entry:", error);
        alert('Failed to delete entry. Please try again.');
      }
    }
  };

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {entries.map((entry, index) => (
        <div key={entry.id} className="border-2 bg-blue-100 px-2 border-red-200 py-4 w-full text-center flex flex-col items-center">
          <p>#{index + 1}</p>
          <h3 className="text-lg font-semibold">{entry.text}</h3>
          <p className="text-gray-600 border-2 border-gray-500 p-2 bg-red-100 rounded w-fit mt-4">{entry.mood}</p>
          {entry.tags && entry.tags.length > 0 && entry.tags.map((tag, index) => (
            <span key={index} className="text-sm text-blue-500 mr-2 mt-1">#{tag}</span>
          ))}
          <button
            onClick={() => onDelete(entry._id)}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

  
