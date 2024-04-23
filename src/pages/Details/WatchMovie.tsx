import { Spin } from "antd";
import { useState } from "react";
import { FaCirclePlay } from "react-icons/fa6";

interface IProps {
  title: string;
  backdrop_path: string;
}

export default function WatchMovie({ backdrop_path, title }: IProps) {
  const [wannaWatch, setWannaWatch] = useState<boolean>(false);
  const imageBaseURL = import.meta.env.VITE_BASE_URL;
  return (
    <div className="lg:h-[500px] overflow-hidden relative">
      <img
        src={imageBaseURL + backdrop_path}
        alt={title}
        className="w-full cover select-none"
      />
      <div className="absolute bottom-0 left-0 w-full h-full custom-video-gradient z-10"></div>
      <div className="z-20 cursor-pointer absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        {wannaWatch ? (
          <Spin size="large" />
        ) : (
          <FaCirclePlay
            color="var(--primary-color)"
            onClick={() => setWannaWatch(true)}
            className="h-[100px] w-[100px]"
          />
        )}
      </div>
    </div>
  );
}
