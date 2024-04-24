import { create } from "zustand";

interface ISearchStore {
  query: string;
  include_adult: boolean;
  language: string;
  page: number;
  setQuery: (newQuery: string) => void;
  setPage: (newPage: number) => void;
}

export const useSearchStore = create<ISearchStore>((set) => ({
  query: "",
  include_adult: false,
  language: "en-US",
  page: 1,
  setQuery: (newQuery: string) =>
    set((state) => ({
      ...state,
      query: newQuery,
    })),
  setPage: (newPage) =>
    set((state) => ({
      ...state,
      page: newPage,
    })),
}));
