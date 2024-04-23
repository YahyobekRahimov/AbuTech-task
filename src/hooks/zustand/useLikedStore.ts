import { create } from "zustand";
import { IGenre, IMovieResult } from "../../types/ApiDataTypes";

interface LikedMoviesState {
  likedMovies: IMovieResult[];
  genres: IGenre[];
  addLikedMovie: (newMovie: IMovieResult) => void;
  removeMovie: (id: number) => void;
  addGenres: (genres: IGenre[]) => void;
}

export const useLikedStore = create<LikedMoviesState>((set) => ({
  likedMovies: [],
  genres: [],
  addLikedMovie: (newMovie) => {
    return set((state) => ({
      likedMovies: [...state.likedMovies, newMovie],
    }));
  },
  removeMovie: (id) => {
    return set((state) => ({
      likedMovies: state.likedMovies.filter(
        (movie) => movie.id !== id
      ),
    }));
  },
  addGenres: (genres) => set((state) => ({ ...state, genres })),
}));
