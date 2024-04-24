import { Button } from "antd";
import Search, { SearchProps } from "antd/es/input/Search";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useSearchStore } from "../../hooks/zustand/useSearchStore";
import { MouseEvent, useState } from "react";

export default function SearchInput() {
  const [visible, setVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  const setQuery = useSearchStore((state) => state.setQuery);
  const onSearch: SearchProps["onSearch"] = (value) => {
    setQuery(value);
    navigate(
      `/search?query=${value}&include_adult=false&language=en-US&page=1`
    );
    setVisible(false);
  };
  const handleBlurClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setVisible(false);
  };
  return (
    <div className="flex items-center">
      <Button type="text" onClick={() => setVisible(!visible)}>
        <BiSearch className="w-[20px] h-[20px] md:hidden" />
      </Button>
      <Search
        rootClassName={`${
          visible
            ? "fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-500%] z-40"
            : "hidden md:block"
        }`}
        placeholder="Search Movie..."
        onSearch={onSearch}
        style={{ width: 200 }}
        enterButton={
          <Button type="primary">
            <BiSearch className="w-[20px] h-[20px]" />
          </Button>
        }
      />
      {visible ? (
        <div
          onClick={handleBlurClick}
          className="fixed left-0 top-0 w-screen h-screen backdrop-blur-md z-30"
        ></div>
      ) : (
        ""
      )}
    </div>
  );
}
