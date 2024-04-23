import { IMovieResult } from "../../types/ApiDataTypes";
import { FaStar, FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { FcLike } from "react-icons/fc";
import { LuHeart } from "react-icons/lu";
import { useLikedStore } from "../../hooks/zustand/useLikedStore";

export default function PopoverContent(props: IMovieResult) {
  const likedMovies = useLikedStore((state) => state.likedMovies);
  const isLiked = likedMovies.some((movie) => movie.id === props.id);
  const addLikedMovie = useLikedStore((state) => state.addLikedMovie);
  const removeLikedMovie = useLikedStore(
    (state) => state.removeMovie
  );
  const genres = useLikedStore((state) => state.genres);

  const handleLiked = () => {
    if (isLiked) {
      removeLikedMovie(props.id);
    } else {
      addLikedMovie(props);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-10">
        <h3 className="text-lg font-semibold">{props.title}</h3>
        <div
          className="cursor-pointer scale-150"
          onClick={handleLiked}
        >
          {isLiked ? <FcLike /> : <LuHeart />}
        </div>
      </div>
      <div className="flex items-center gap-5">
        <p className="flex items-center gap-2">
          For adults:{" "}
          {props.adult ? <FaCheckCircle /> : <IoMdCloseCircle />}
        </p>
        <p>{props.release_date.slice(0, 4)}</p>
        <p className="flex items-center gap-2">
          {<FaStar color="var(--yellow-star)" />} {props.vote_average}
          /10
        </p>
      </div>
      <div className="w-full bg-slate-600 h-[1px] my-1" />
      <div>
        <span className="font-semibold">Language: </span>
        <span className="uppercase">{props.original_language}</span>
      </div>
      <div>
        <span className="font-semibold">Genres: </span>
        {genres
          .filter((genre) => props.genre_ids.includes(genre.id))
          .map((selectedGenre) => selectedGenre.name)
          .join(", ")}
      </div>
      <div className="w-[300px] mt-2">
        <p className="text-center text-base font-semibold">
          Overview
        </p>
        <p>{props.overview.split(" ").slice(0, 20).join(" ")}...</p>
      </div>
    </div>
  );
}
