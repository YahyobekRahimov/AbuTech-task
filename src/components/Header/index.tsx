import Container from "../Container";
import { Link, useLocation } from "react-router-dom";
import SearchInput from "./SearchInput";
import { IoMenuSharp } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

interface INav {
  path: string;
  label: string;
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
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
  const width = window.innerWidth;
  return (
    <header>
      <Container className="flex items-center justify-between py-3 md:py-5">
        <div
          className="md:hidden z-[70]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen && (
            <AnimatePresence>
              <motion.div
                // X
                initial="invisible"
                variants={{
                  visible: {
                    scale: 1,
                    transition: { type: "spring", delay: 0.3 },
                  },
                  invisible: {
                    scale: 0,
                  },
                  exit: {
                    scale: 0,
                  },
                }}
                animate="visible"
                exit="exit"
                className="absolute top-[0.1rem] right-[0.1rem]"
              >
                <IoMdClose className="w-[40px] h-[40px]" />
              </motion.div>
            </AnimatePresence>
          )}
          {!menuOpen && (
            <AnimatePresence>
              <motion.div
                variants={{
                  initial: { scale: 0 },
                  visible: { scale: 1, transition: { delay: 0.3 } },
                  exit: { scale: 0 },
                }}
                initial="initial"
                animate="visible"
                exit="exit"
              >
                <IoMenuSharp className="w-[30px] h-[30px]" />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
        <div className="text-3xl text-[--primary-color]">
          <Link to="/">LOGO</Link>
        </div>
        <AnimatePresence>
          <motion.div
            className="fixed top-0 left-0 w-screen h-screen bg-slate-500 z-50 md:static md:h-auto md:w-auto md:bg-transparent"
            initial={menuOpen ? "visible" : ""}
            animate={!menuOpen && width < 767 ? "invisible" : ""}
            exit="exit"
            variants={{
              "visible": { x: "0", visibility: "visible" },
              "invisible": { x: "100vw", visibility: "hidden" },
            }}
            transition={{ type: "tween", duration: 0.3, repeat: 0 }}
          >
            <nav className="mx-auto">
              <ul className="flex gap-5 h-screen w-screen justify-center items-center font-semibold text-lg flex-col md:text-lg md:flex-row md:w-auto md:h-auto">
                {NavLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      className={`relative after:content-[''] after:absolute
                   after:bg-slate-200 after:bottom-0 after:left-0 after:w-full 
                   after:h-[1px] md:after:h-[2px] hover:after:opacity-100 
                   hover:after:translate-x-0 after:duration-200 after:origin-left ${
                     link.path === location.pathname
                       ? "after:opacity-100 after:translate-x-0"
                       : "after:opacity-0 after:translate-x-[-200%]"
                   }`}
                      to={link.path}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        </AnimatePresence>
        <SearchInput />
      </Container>
    </header>
  );
}
