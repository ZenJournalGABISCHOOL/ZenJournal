import {configureStore} from '@reduxjs/toolkit'
import auth from './slices/authSlice'


const zenJournalStore = configureStore({
  reducer: {
    auth: auth,
  },
});
export default zenJournalStore;