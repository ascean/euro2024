import { configureStore } from '@reduxjs/toolkit';
import teamReducer from '../redux/teamSlice'

export default configureStore({
  reducer: {
    teams: teamReducer,
  },
});
