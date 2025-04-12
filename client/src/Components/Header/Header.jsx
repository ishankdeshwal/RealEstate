import React, { useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import AddPropertyModel from "../AddPropertyModel/AddPropertyModel";
import useAuthCheck from "../../Hooks/UseAuthCheck";

function Header() {
  const [menuOpened, setMenuOpened] = useState(false);
  const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();
  const [modelOpened, setModelOpened] = useState(false);
  const { validateLogin } = useAuthCheck();

  const handleAddProperty = () => {
    if (validateLogin()) {
      setModelOpened(true);
    }
  };

  return (
    <section className="text-white sticky top-0 z-50">
      <div className="flex justify-between items-center py-4 px-4 sm:px-6 text-[var(--secondary)]">
        <Link to="/" className="flex items-center">
          <img src="/logo.png" alt="logo" className="h-8 sm:h-8" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:flex-row md:gap-8  justify-end w-full">
          <NavLink
            to="/properties"
            className="text-center py-1 hover:text-blue-500 transition-colors cursor-pointer nav-link"
          >
            Properties
          </NavLink>

          <a
            href="mailto:deshwalishank@gmail.com"
            className="text-center py-1 hover:text-blue-500 transition-colors cursor-pointer nav-link"
          >
            Contact
          </a>

          <div
            onClick={handleAddProperty}
            className="text-center py-1 hover:text-blue-500 transition-colors cursor-pointer nav-link"
          >
            Add Property
          </div>

          <AddPropertyModel opened={modelOpened} setOpened={setModelOpened} />

          {!isAuthenticated ? (
            <button
              type="button"
              className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-full
                transition-all duration-300 ease-in-out
                hover:bg-blue-700 hover:cursor-pointer shadow"
              onClick={() => {
                loginWithRedirect();
                setMenuOpened(false);
              }}
              style={{ appearance: "none" }}
            >
              Login
            </button>
          ) : (
            <div className="w-full md:w-auto flex justify-center">
              <ProfileMenu user={user} logout={logout} />
              
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div
            className={`md:hidden flex flex-col items-center
              absolute top-16 right-4 sm:right-8
              bg-white text-black
              p-6 rounded-lg shadow-md
              transition-all duration-300 ease-in gap-4 z-[99] w-[200px] sm:w-[250px]
              ${
                menuOpened
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0 pointer-events-none"
              }`}
          >
            <NavLink
              to="/properties"
              className="w-full text-center py-1 hover:text-blue-500 transition-colors cursor-pointer nav-link"
              onClick={() => setMenuOpened(false)}
            >
              Properties
            </NavLink>

            <a
              href="mailto:deshwalishank@gmail.com"
              className="w-full text-center py-1 hover:text-blue-500 transition-colors cursor-pointer nav-link"
              onClick={() => setMenuOpened(false)}
            >
              Contact
            </a>

            <div
              onClick={() => {
                handleAddProperty();
                setMenuOpened(false);
              }}
              className="w-full text-center py-1 hover:text-blue-500 transition-colors cursor-pointer nav-link"
            >
              Add Property
            </div>

            {!isAuthenticated ? (
              <button
                type="button"
                className="w-full px-4 py-1 bg-blue-600 text-white rounded-full
                transition-all duration-300 ease-in-out
                hover:bg-blue-700 hover:cursor-pointer shadow nav-link"
                onClick={() => {
                  loginWithRedirect();
                  setMenuOpened(false);
                }}
                style={{ appearance: "none" }}
              >
                Login
              </button>
            ) : (
              <div className="w-full flex justify-center">
                <ProfileMenu user={user} logout={logout} />
              </div>
            )}
          </div>
        </OutsideClickHandler>

        {/* Menu Toggle Button */}
        <div
          onClick={() => setMenuOpened((prev) => !prev)}
          className="menu-icon md:hidden cursor-pointer"
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
}

export default Header;
