import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    category: 'trends',
  }
  
  export const categorySlice = createSlice({
    name: 'category',
    initialState,  
    reducers: {
      
      setCategoryTo: (state, action) => {
        state.category = action.payload
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setCategoryTo } = categorySlice.actions
  
  export default categorySlice.reducer

  
  