import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    savedItem: [],
  }
  
  export const SaveSlice = createSlice({
    name: 'savedItem',
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

  
  