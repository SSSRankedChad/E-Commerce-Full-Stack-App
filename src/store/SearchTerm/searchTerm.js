import { createSlice } from '@reduxjs/toolkit';



const searchTermSlice = createSlice({
   name: 'searchTerm',
   initialState: '',
   reducers: {
    setSearchTerm = (state, action) => {
       state = action.payload;
       return state;
    },
    clearSearchTerm = (state, action) => {
	state = '';
	return state;
    },
});


export default { setSearchTerm, clearSearchTerm } = searchTermSlice.actions;
export default searchTermSlice.reducer;


export const selectSearchTerm = state = state.searchTerm;
