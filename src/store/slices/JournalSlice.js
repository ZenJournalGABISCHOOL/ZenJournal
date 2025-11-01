import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  entries: JSON.parse(localStorage.getItem("journalEntries")) || []
};

const journalSlice = createSlice({
  name: "Zainjournal",
  initialState,
  reducers: {
    addEntry: {
      reducer(state, action) {
        state.entries.push(action.payload);
      },
      prepare(title, content) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString()
          }
        };
      }
    },
    updateEntry(state, action) {
      const { id, title, content } = action.payload;
      const existing = state.entries.find(e => e.id === id);
      if (existing) {
        existing.title = title;
        existing.content = content;
        existing.lastModified = new Date().toISOString(); // Add last modified timestamp
        // Save to localStorage after updating
        saveEntriesToStorage(state.entries);
      }
    },
    deleteEntry(state, action) {
      state.entries = state.entries.filter(e => e.id !== action.payload);
      // Save to localStorage after deleting
      saveEntriesToStorage(state.entries);
    },
    // New action to clear all entries (optional)
    clearAllEntries(state) {
      state.entries = [];
      saveEntriesToStorage(state.entries);
    },
    // New action to import entries (optional, useful for backup/restore)
    importEntries(state, action) {
      state.entries = action.payload;
      saveEntriesToStorage(state.entries);
    }
  }
});

export const { addEntry, updateEntry, deleteEntry, clearAllEntries, importEntries } = journalSlice.actions;
export default journalSlice.reducer;
