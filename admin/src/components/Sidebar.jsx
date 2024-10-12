import { NavLink } from "react-router-dom";
import { assets } from "../assets/admin_assets/assets";

export const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border border-t-0 border-r-2 border-b-2 border-borderPurple">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          to="/add"
          className="flex items-center gap-3 border border-borderPurple border-r-0 px-3 py-2 rounded-l"
        >
          <img src={assets.add_icon} alt="add icon" className="w-5 h-5" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>

        <NavLink
          to="/list"
          className="flex items-center gap-3 border border-borderPurple border-r-0 px-3 py-2 rounded-l"
        >
          <img src={assets.order_icon} alt="list icon" className="w-5 h-5" />
          <p className="hidden md:block">List Items</p>
        </NavLink>

        <NavLink
          to="/orders"
          className="flex items-center gap-3 border border-borderPurple border-r-0 px-3 py-2 rounded-l"
        >
          <img src={assets.bag_icon} alt="order icon" className="w-5 h-5" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};
