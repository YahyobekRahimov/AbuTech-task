import Container from "../../components/Container";
import MovieCard from "../../components/MovieCard";
import { useLikedStore } from "../../hooks/zustand/useLikedStore";

export default function Liked() {
  const likedMovies = useLikedStore((state) => state.likedMovies);
  return (
    <Container>
      <ul className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {likedMovies.map((movie) => (
          <MovieCard {...movie} />
        ))}
      </ul>
    </Container>
  );
}
