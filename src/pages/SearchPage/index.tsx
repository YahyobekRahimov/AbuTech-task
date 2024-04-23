import Container from "../../components/Container";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { searchMovies } from "../../lib/apiService";
import { Pagination, Spin } from "antd";
import { ISearchResultRoot } from "../../types/ApiDataTypes";
import MovieCard from "../../components/MovieCard";

export default function SearchPage() {
  const url = new URL(window.location.href);
  const searchParams = url.searchParams;
  const query = searchParams.get("query");
  const include_adult = searchParams.get("include_adult");
  const language = searchParams.get("language");
  const page = searchParams.get("page");

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: [
      "movie search",
      { query, include_adult, language, page },
    ],
    queryFn: () => searchMovies(query || "", false, "en-US"),
    staleTime: Infinity,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!data) {
    return;
  }

  const movies: ISearchResultRoot = data;

  return (
    <main>
      <Container className="mt-10">
        <ul className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {movies?.results.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </ul>
        <div className="my-10 mb-20">
          <Pagination
            defaultCurrent={1}
            total={movies.total_results}
            pageSize={10}
            pageSizeOptions={[10]}
          />
        </div>
      </Container>
    </main>
  );
}
