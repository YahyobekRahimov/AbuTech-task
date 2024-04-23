import { create } from "zustand";

interface ISearchStore {
  query: string;
  include_adult: boolean;
  language: string;
  page: number;
}

export const useSearchStore = create<ISearchStore>((set) => ({
  query: "",
  include_adult: false,
  language: "en-US",
  page: 1,
}));
