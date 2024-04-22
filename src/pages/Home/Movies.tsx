import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MovieTypes, fetchMovies } from "../../lib/apiService";
import { Card, Divider, Spin } from "antd";
import { IMovie } from "../../types/ApiDataTypes";

export default function PopularMovies({
  movieType,
}: {
  movieType: MovieTypes;
}) {
  const queryClient = useQueryClient();
  const page = 1;
  const { data, isLoading } = useQuery({
    queryKey: ["movies", { movieType }],
    queryFn: () => fetchMovies(page, movieType),
    staleTime: Infinity,
  });
  let movies: IMovie = data;
  if (isLoading) {
    return (
      <div className="flex h-full justify-center items-center">
        <Spin size="large" />;
      </div>
    );
  }
  const imageBaseURL = import.meta.env.VITE_BASE_URL;
  return (
    <ul className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
      {movies?.results.map((movie) => (
        <li
          key={movie.id}
          className="flex flex-col items-center cursor-pointer"
        >
          <img
            src={imageBaseURL + movie.poster_path}
            alt={movie.title}
          />
          <h3 className="text-xl font-semibold">{movie.title}</h3>
        </li>
      ))}
    </ul>
  );
}
