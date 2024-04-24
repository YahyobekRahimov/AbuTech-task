import Container from "../../components/Container";
import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../../lib/apiService";
import { Pagination, Spin } from "antd";
import { ISearchResultRoot } from "../../types/ApiDataTypes";
import MovieCard from "../../components/MovieCard";
import { useSearchStore } from "../../hooks/zustand/useSearchStore";

export default function SearchPage() {
  const query = useSearchStore((state) => state.query);
  const page = useSearchStore((state) => state.page);
  const language = useSearchStore((state) => state.language);
  const include_adult = useSearchStore(
    (state) => state.include_adult
  );
  const setPage = useSearchStore((state) => state.setPage);

  const { data, isLoading } = useQuery({
    queryKey: [
      "movie search",
      { query, include_adult, language, page },
    ],
    queryFn: query
      ? () => searchMovies(query, false, "en-US", page)
      : () =>
          Promise.resolve({
            page: 1,
            results: [],
            total_pages: 1,
            total_results: 0,
          }),
    staleTime: Infinity,
  });

  if (!query.length) {
    return (
      <h1 className="text-3xl">
        Please, write something in the text field to search for movies
      </h1>
    );
  }
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
  const handlePageChange = (page: number) => {
    setPage(page);
  };
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
            total={movies.total_results}
            pageSize={movies.results.length}
            pageSizeOptions={[20]}
            current={page}
            onChange={handlePageChange}
          />
        </div>
      </Container>
    </main>
  );
}
