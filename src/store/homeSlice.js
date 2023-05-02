import { createSlice } from '@reduxjs/toolkit'



export const homeSlice = createSlice({
  name: 'home',
  initialState: {
    url: {},
    genre: {}
  },
  reducers: {
    getApiConf: (state, action) => {
      state.url = action.payload;
    },
    getGenre: (state, action) => {
      state.genre = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { getApiConf, getGenre } = homeSlice.actions

export default homeSlice.reducer