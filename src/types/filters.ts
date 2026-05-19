export type FilterType = 'author' | 'year' | 'genre' | null;
export type YearSortType = 'newest' | 'oldest' | null;

export interface FiltersState {
  selectedAuthor: string | null;
  selectedGenre: string | null;
  yearSort: YearSortType;
}