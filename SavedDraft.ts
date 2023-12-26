import {createSlice} from '@reduxjs/toolkit';

export const SavedDraft = createSlice({
  name: 'saveddraft',
  initialState: {
    saveddraft: [],
  },
  reducers: {
    savedDraft: (state, action) => {
      state.saveddraft.push({...action.payload});
    },
  },
});

export const {savedDraft} = SavedDraft.actions;

export default SavedDraft.reducer;
