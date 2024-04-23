import { Popover } from "antd";
import PopoverContent from "../pages/Home/PopoverContent";
import { IMovieResult } from "../types/ApiDataTypes";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function MovieCard(movie: IMovieResult) {
  const imageBaseURL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  return (
    <li key={movie.id}>
      <Popover
        mouseEnterDelay={0.5}
        content={<PopoverContent {...movie} />}
      >
        <div
          onClick={() => navigate(`/movie/${movie.id}`)}
          className="flex relative flex-col cursor-pointer card-hover-effect"
        >
          <div className="relative rounded-lg">
            <img
              src={imageBaseURL + movie.poster_path}
              alt={movie.title}
              className="select-none rounded-lg"
            />
            <span className="absolute bottom-0 left-0 w-full h-full z-10 image-mask rounded-lg"></span>
          </div>
          <h3 className="text-xl font-semibold my-2 h-[3.5rem]">
            {movie.title}
          </h3>
          <div className="flex items-center justify-between">
            <p>{movie.release_date.slice(0, 4)}</p>
            <div className="flex items-center gap-2">
              <FaStar color="var(--yellow-star)" />
              {movie.vote_average}
            </div>
          </div>
        </div>
      </Popover>
    </li>
  );
}
