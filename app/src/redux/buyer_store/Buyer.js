import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    Buyer: {
        isRegistered: false,
        ref: null
    },
  }
  
  export const BuyerSlice = createSlice({
    name: 'Buyer',
    initialState,
    reducers: {
      
      setBuyerTo: (state, action) => {
        state.Buyer = action.payload
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setBuyerTo } = BuyerSlice.actions
  
  export default BuyerSlice.reducer

  
  