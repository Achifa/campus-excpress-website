import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    Save: [],
  }
  
  export const SaveSlice = createSlice({
    name: 'Save',
    initialState,
    reducers: {
      
      setSaveTo: (state, action) => {
        state.Save = action.payload
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setSaveTo } = SaveSlice.actions
  
  export default SaveSlice.reducer

  
  