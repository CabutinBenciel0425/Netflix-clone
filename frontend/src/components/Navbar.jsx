import { LogOut, Menu, Search } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";
import { useContentStore } from "../store/content";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signout } = useAuthStore();
  const { setContentType } = useContentStore();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleClickOutside = useCallback((event) => {
    const target = event.target;

    const isInsideMenu = menuRef.current?.contains(target);
    const isInsideButton = buttonRef.current?.contains(target);

    if (!isInsideMenu && !isInsideButton) {
      setIsMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20 relative text-white">
      <div className="flex items-center gap-10 z-50">
        <Link to="/">
          <img
            src="/netflix-logo.png"
            alt="Netflix Logo"
            className="w-32 sm:w-40"
          />
        </Link>

        <div className="hidden md:flex gap-6 items-center ml-10">
          <Link
            to="/"
            className="hover:underline"
            onClick={() => setContentType("movie")}
          >
            Movies
          </Link>
          <Link
            to="/"
            className="hover:underline"
            onClick={() => setContentType("tv")}
          >
            TV Shows
          </Link>
          <Link to="/history" className="hover:underline">
            Search History
          </Link>
        </div>
      </div>

      <div className="flex gap-4 items-center z-50">
        <Link to="/search">
          <Search className="size-6 cursor-pointer" />
        </Link>

        <img
          src={user.image}
          alt="Avatar"
          className="h-8 rounded cursor-pointer"
        />
        <LogOut className="size-6 cursor-pointer" onClick={signout} />

        <div className="md:hidden" ref={buttonRef}>
          <Menu className="size-6 cursor-pointer" onClick={toggleMenu} />
        </div>
      </div>

      <div
        className={`absolute top-16 px-6 right-4 w-content rounded-md md:hidden bg-black border border-gray-800 z-50 transition-all duration-300 ease-out ${
          isMenuOpen
            ? "opacity-100 max-h-screen pointer-events-auto"
            : "opacity-0 max-h-0 pointer-events-none overflow-hidden"
        }`}
        ref={menuRef}
      >
        <Link
          to="/"
          className="block hover:underline p-2 cursor-pointer"
          onClick={() => {
            setContentType("movie");
            toggleMenu();
          }}
        >
          Movies
        </Link>

        <Link
          to="/"
          className="block hover:underline p-2 cursor-pointer"
          onClick={() => {
            setContentType("tv");
            toggleMenu();
          }}
        >
          TV Shows
        </Link>

        <Link
          to="/history"
          className="block hover:underline p-2 cursor-pointer"
          onClick={toggleMenu}
        >
          Search History
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
