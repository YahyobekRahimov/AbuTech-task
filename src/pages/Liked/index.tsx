import Container from "../../components/Container";
import MovieCard from "../../components/MovieCard";
import { useLikedStore } from "../../hooks/zustand/useLikedStore";

export default function Liked() {
  const likedMovies = useLikedStore((state) => state.likedMovies);
  if (likedMovies.length == 0) {
    return (
      <main>
        <div className="text-center text-4xl h-[90vh] flex justify-center items-center">
          You don{"'"}t have any liked movies
        </div>
      </main>
    );
  }
  return (
    <main className="h-screen">
      <Container>
        <ul className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {likedMovies.map((movie) => (
            <MovieCard {...movie} />
          ))}
        </ul>
      </Container>
    </main>
  );
}
