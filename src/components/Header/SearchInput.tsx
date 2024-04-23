import { Button } from "antd";
import Search, { SearchProps } from "antd/es/input/Search";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function SearchInput() {
  const navigate = useNavigate();
  const onSearch: SearchProps["onSearch"] = (value) => {
    navigate(
      `/search?query=${value}&include_adult=false&language=en-US&page=1`
    );
  };
  return (
    <div>
      <Search
        placeholder="Search Movie..."
        onSearch={onSearch}
        style={{ width: 200 }}
        enterButton={
          <Button type="primary">
            <BiSearch className="w-[20px] h-[20px]" />
          </Button>
        }
      />
    </div>
  );
}
