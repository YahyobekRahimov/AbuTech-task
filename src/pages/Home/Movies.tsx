import { useQuery } from "@tanstack/react-query";
import { MovieTypes, fetchMovies } from "../../lib/apiService";
import { Spin } from "antd";
import { IMovie } from "../../types/ApiDataTypes";
import MovieCard from "../../components/MovieCard";

export default function PopularMovies({
  movieType,
}: {
  movieType: MovieTypes;
}) {
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
        <Spin size="large" />
      </div>
    );
  }
  return (
    <ul className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
      {movies?.results.map((movie) => (
        <MovieCard {...movie} />
      ))}
    </ul>
  );
}
