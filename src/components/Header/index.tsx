import Container from "../Container";
import { Link, useLocation } from "react-router-dom";
import SearchInput from "./SearchInput";

interface INav {
  path: string;
  label: string;
}

export default function Header() {
  const location = useLocation();
  const NavLinks: INav[] = [
    {
      path: "/",
      label: "Home",
    },
    {
      path: "/liked",
      label: "Liked Movies",
    },
  ];
  return (
    <header>
      <Container className="flex items-center justify-between">
        <div className="text-3xl py-5 text-[--primary-color]">
          LOGO
        </div>
        <nav className="mx-auto">
          <ul className="flex gap-10 font-semibold text-lg">
            {NavLinks.map((link, index) => (
              <li key={index}>
                <Link
                  className={`relative after:content-[''] after:absolute
                   after:bg-slate-200 after:bottom-0 after:left-0 after:w-full 
                   after:h-[2px] hover:after:opacity-100 
                   hover:after:translate-x-0 after:duration-200 after:origin-left ${
                     link.path === location.pathname
                       ? "after:opacity-100 after:translate-x-0"
                       : "after:opacity-0 after:translate-x-[-200%]"
                   }`}
                  to={link.path}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <SearchInput />
      </Container>
    </header>
  );
}
