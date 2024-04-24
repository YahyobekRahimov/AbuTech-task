import { Popover } from "antd";
import PopoverContent from "../pages/Home/PopoverContent";
import { IMovieResult } from "../types/ApiDataTypes";
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
          <h3 className="text-xl font-semibold my-2 min-h-[3.5rem]">
            {movie.title}
          </h3>
        </div>
      </Popover>
    </li>
  );
}
