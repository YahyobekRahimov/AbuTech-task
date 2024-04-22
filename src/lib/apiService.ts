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

    const data = await response.json();
    console.log("fetched data once");
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
