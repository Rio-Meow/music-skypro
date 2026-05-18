import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  searchQuery: string;
  selectedAuthor: string | null;
  selectedGenre: string | null;
  yearSort: 'newest' | 'oldest' | null;
}

const initialState: FiltersState = {
  searchQuery: '',
  selectedAuthor: null,
  selectedGenre: null,
  yearSort: null,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedAuthor: (state, action: PayloadAction<string | null>) => {
      state.selectedAuthor = action.payload;
    },
    setSelectedGenre: (state, action: PayloadAction<string | null>) => {
      state.selectedGenre = action.payload;
    },
    setYearSort: (state, action: PayloadAction<'newest' | 'oldest' | null>) => {
      state.yearSort = action.payload;
    },
    clearFilters: (state) => {
      state.searchQuery = '';
      state.selectedAuthor = null;
      state.selectedGenre = null;
      state.yearSort = null;
    },
  },
});

export const { setSearchQuery, setSelectedAuthor, setSelectedGenre, setYearSort, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;