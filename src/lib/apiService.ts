import {
  IGenreRoot,
  IMovie,
  IMovieDetails,
  ISearchResultRoot,
} from "../types/ApiDataTypes";

export type MovieTypes =
  | "popular"
  | "top_rated"
  | "upcoming"
  | "now_playing";

export const fetchMovies = async (
  page: number = 1,
  movieType: MovieTypes = "top_rated"
) => {
  const url = `https://api.themoviedb.org/3/movie/${movieType}?language=en-US&page=${page}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzM2MwYWZlMTYyNjAwNWM5MzAzNDMyMzVjNTYzYWQ2MiIsInN1YiI6IjY1NjA2NGVmMmIxMTNkMDEwY2MwYjU2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U_sA7zS9sks9WxpONrqC-vdjwqgn8Z7qc2TayDs7Vmg",
    },
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to retrieve data");
    }

    const data: IMovie = await response.json();
    console.log("fetched data once");
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchGenres = async () => {
  const url =
    "https://api.themoviedb.org/3/genre/movie/list?language=en";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzM2MwYWZlMTYyNjAwNWM5MzAzNDMyMzVjNTYzYWQ2MiIsInN1YiI6IjY1NjA2NGVmMmIxMTNkMDEwY2MwYjU2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U_sA7zS9sks9WxpONrqC-vdjwqgn8Z7qc2TayDs7Vmg",
    },
  };
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw Error("Failed to retrieve genres");
    }
    const data: IGenreRoot = await res.json();
    console.log("Fetched genres");
    return data.genres;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchMovieDetails = async (movieId: number) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzM2MwYWZlMTYyNjAwNWM5MzAzNDMyMzVjNTYzYWQ2MiIsInN1YiI6IjY1NjA2NGVmMmIxMTNkMDEwY2MwYjU2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U_sA7zS9sks9WxpONrqC-vdjwqgn8Z7qc2TayDs7Vmg",
    },
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to retrieve movie details");
    }

    const data: IMovieDetails = await response.json();
    console.log("fetched Movie details");
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const searchMovies = async (
  query: string,
  include_adult: boolean = false,
  language: string = "en-US",
  page: number = 1
) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=${include_adult}&language=${language}&page=${page}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzM2MwYWZlMTYyNjAwNWM5MzAzNDMyMzVjNTYzYWQ2MiIsInN1YiI6IjY1NjA2NGVmMmIxMTNkMDEwY2MwYjU2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U_sA7zS9sks9WxpONrqC-vdjwqgn8Z7qc2TayDs7Vmg",
    },
  };

  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error("Failed to retrieve movie");
    }

    const data: ISearchResultRoot = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
