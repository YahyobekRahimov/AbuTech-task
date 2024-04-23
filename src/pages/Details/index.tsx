import { useLocation } from "react-router-dom";
import Container from "../../components/Container";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetails } from "../../lib/apiService";
import { Spin } from "antd";
import { FaCirclePlay } from "react-icons/fa6";
import { useState } from "react";
import { BsStarFill } from "react-icons/bs";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useLikedStore } from "../../hooks/zustand/useLikedStore";
import { IMovieResult } from "../../types/ApiDataTypes";
import { motion } from "framer-motion";
import WatchMovie from "./WatchMovie";

export default function Details() {
  // Getting the movie ID
  const location = useLocation();
  const startIndex = location.pathname.indexOf("movie/") + 6;
  const id = parseInt(location.pathname.slice(startIndex));

  // Making API calls to fetch details
  const { data: movie, isLoading } = useQuery({
    queryKey: ["movie details", { id }],
    queryFn: () => fetchMovieDetails(id),
    staleTime: Infinity,
  });

  // importing liked store functions and movies
  const likedMovies = useLikedStore((state) => state.likedMovies);
  const isLiked = likedMovies.some((movie) => movie.id === id);
  const addLikedMovie = useLikedStore((state) => state.addLikedMovie);
  const removeLikedMovie = useLikedStore(
    (state) => state.removeMovie
  );

  // return spinner if no data
  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-24">
        <Spin size="large" />
      </div>
    );
  }
  if (!movie?.id) {
    return;
  }

  // format the data
  const MovieData: IMovieResult = {
    id: movie.id,
    adult: movie.adult,
    backdrop_path: movie.backdrop_path,
    genre_ids: movie.genres.map((genre) => genre.id),
    original_language: movie.original_language,
    original_title: movie.original_title,
    overview: movie.overview,
    popularity: movie.popularity,
    poster_path: movie.poster_path,
    release_date: movie.poster_path,
    title: movie.title,
    video: movie.video,
    vote_average: movie.vote_average,
    vote_count: movie.vote_count,
  };
  const handleLiked = () => {
    if (isLiked) {
      removeLikedMovie(id);
    } else {
      addLikedMovie(MovieData);
    }
  };
  const imageBaseURL = import.meta.env.VITE_BASE_URL;

  return (
    <main>
      <WatchMovie
        backdrop_path={movie.backdrop_path}
        title={movie.title}
      />
      <Container>
        <div className="mt-10">
          <div>
            <div className="rounded-lg overflow-hidden w-max items-start gap-5 flex">
              <img
                className="select-none rounded-lg hidden lg:inline-block"
                src={imageBaseURL + movie?.poster_path}
                alt={movie?.title}
              />
              <div className="w-full flex flex-col">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold">
                    {movie?.title}
                  </h2>
                  <div onClick={handleLiked}>
                    {isLiked ? (
                      <FaHeart
                        color="var(--primary-color)"
                        className="w-[50px] h-[50px] cursor-pointer"
                      />
                    ) : (
                      <FaRegHeart className="w-[50px] h-[50px] cursor-pointer" />
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    <BsStarFill />
                    {movie?.vote_average}
                  </div>
                  <div>{movie?.release_date.slice(0, 4)}</div>
                  <div>{movie?.runtime} min</div>
                </div>

                <p className="text-wrap w-[90vw] xs:w-[70vw] lg:w-[60vw] my-5">
                  {movie?.overview}
                </p>

                <div className="flex flex-col gap-2 mt-2">
                  <div className="grid grid-cols-[120px_100px] xs:grid-cols-[180px_1fr]">
                    <span className="opacity-65">Status:</span>{" "}
                    {movie?.status}
                  </div>
                  <div className="grid grid-cols-[120px_100px] xs:grid-cols-[180px_1fr]">
                    <span className="opacity-65">Budget:</span> $
                    {movie?.budget.toLocaleString()}
                  </div>
                  <div className="grid grid-cols-[120px_100px] xs:grid-cols-[180px_1fr]">
                    <span className="opacity-65">Popularity:</span>{" "}
                    {movie?.popularity}
                  </div>
                  <div className="grid grid-cols-[120px_100px] xs:grid-cols-[180px_1fr]">
                    <span className="opacity-65">Genre:</span>{" "}
                    {movie?.genres
                      .map((genre) => genre.name)
                      .join(", ")}
                  </div>
                  <div className="grid grid-cols-[120px_100px] xs:grid-cols-[180px_1fr]">
                    <span className="opacity-65">
                      Origin country:
                    </span>{" "}
                    {movie?.origin_country}
                  </div>
                  <div className="grid grid-cols-[120px_100px] xs:grid-cols-[180px_1fr]">
                    <span className="opacity-65">
                      Production companies:
                    </span>{" "}
                    {movie?.production_companies.map(
                      (company) => company.name
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
