import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  activeFilter: 'author' | 'year' | 'genre' | null;
  authors: string[];
  genres: string[];
  years: string[];
  yearSort: 'newest' | 'oldest' | null;
}

const initialState: FiltersState = {
  activeFilter: null,
  authors: [],
  genres: [],
  years: [],
  yearSort: null,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setActiveFilter: (state, action: PayloadAction<'author' | 'year' | 'genre' | null>) => {
      state.activeFilter = action.payload;
    },
    setAuthors: (state, action: PayloadAction<string[]>) => {
      state.authors = action.payload;
    },
    setGenres: (state, action: PayloadAction<string[]>) => {
      state.genres = action.payload;
    },
    setYears: (state, action: PayloadAction<string[]>) => {
      state.years = action.payload;
    },
    setYearSort: (state, action: PayloadAction<'newest' | 'oldest' | null>) => {
      state.yearSort = action.payload;
    },
  },
});

export const { setActiveFilter, setAuthors, setGenres, setYears, setYearSort } = filtersSlice.actions;
export default filtersSlice.reducer;