import { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";

export const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const inputRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  useEffect(() => {
    if (showSearch && visible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch, visible]);

  return showSearch && visible ? (
    <div>
      {/* Search Bar */}
      <div className="border-t border-borderPurple bg-gray-50 text-center">
        <div className="inline-flex items-center border border-borderPurple px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-inherit text-sm text-customeDarkPurple placeholder:text-bgPurple"
          />
          <img src={assets.search_icon} alt="search icon" className="w-4" />
        </div>
        <img
          src={assets.cross_icon}
          alt="cross icon"
          className="inline w-3 cursor-pointer"
          onClick={() => setShowSearch(false)}
        />
      </div>
    </div>
  ) : null;
};
