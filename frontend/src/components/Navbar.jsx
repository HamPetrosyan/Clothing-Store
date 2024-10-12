import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { ShopContext } from "../context/ShopContext.jsx";
import { assets } from "../assets/frontend_assets/assets.js";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/collection", label: "Collection" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);
  const location = useLocation();

  const isCollectionPage = location.pathname === "/collection";

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="custom:w-64 w-40" />
      </Link>
      <div className="hidden custom:flex gap-5 text-sm text-customeDarkPurple">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 relative ${
                isActive ? "hr-visible" : ""
              }`
            }
          >
            <p className="uppercase">{link.label}</p>
            <hr className="absolute bottom-[-4px] w-2/4 border-none h-[1.5px] bg-customeDarkPurple opacity-0 transition-opacity duration-300" />
          </NavLink>
        ))}
      </div>

      <div className="flex items-center ml-2 gap-6">
        {isCollectionPage && (
          <img
            src={assets.search_icon}
            alt="search"
            className="w-5 cursor-pointer"
            onClick={() => setShowSearch(true)}
          />
        )}

        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            src={assets.profile_icon}
            alt="profile icon"
            className="w-5 min-w-5 cursor-pointer"
          />

          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-2">
              <div className="flex flex-col gap-2 w-36 p-3 bg-bgPurple text-customeNormPurple rounded">
                <p className="cursor-pointer hover:text-customeDarkPurple">
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-customeDarkPurple"
                >
                  Oders
                </p>
                <p
                  onClick={logout}
                  className="cursor-pointer hover:text-customeDarkPurple"
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="cart icon" className="w-5 min-w-5" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-customeDarkPurple text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          alt="menu icon"
          className="w-5 cursor-pointer custom:hidden"
        />
      </div>

      {visible && (
        <div
          onClick={() => setVisible(false)}
          className="fixed inset-0 bg-black bg-opacity-50 custom:bg-opacity-0 backdrop-blur-sm custom:backdrop-blur-none z-40"
        ></div>
      )}

      {/* Sidebar Menu */}
      <div
        className={`custom:hidden fixed top-0 left-0 z-50 h-1/2 w-full bg-white transition-all transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex flex-col text-customeNormPurple h-full">
          <div className="cursor-pointer">
            <div
              className="inline-flex items-center gap-4 p-3"
              onClick={() => setVisible(false)}
            >
              <img
                src={assets.dropdown_icon}
                alt="dropdown icon"
                className="h-4 transform -rotate-90"
              />
              <p>Back</p>
            </div>
          </div>

          {navLinks.map((link, idx) => (
            <NavLink
              key={link.to}
              onClick={() => {
                if (location.pathname !== link.to) {
                  setVisible(false);
                }
              }}
              className={`${
                idx === navLinks.length - 1 ? "border-t border-b" : "border-t"
              } py-2 pl-6 uppercase border-borderPurple`}
              to={link.to}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};
