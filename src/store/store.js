import { configureStore } from '@reduxjs/toolkit';
import teamReducer from '../redux/teamSlice'
import stepReducer from '../redux/stepSlice'

export default configureStore({
  reducer: {
    teams: teamReducer,
    steps: stepReducer
  },
});
