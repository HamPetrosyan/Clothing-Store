import { assets } from "../assets/admin_assets/assets";

export const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center justify-between py-2 px-[4%]">
      <img src={assets.logo} alt="logo" className="w-[max(13%,80px)]" />
      <button
        onClick={() => setToken("")}
        className="uppercase bg-customeNormPurple text-white px-5 py-2 sm:px-7 rounded-full text-xs active:bg-customeDarkPurple"
      >
        Logout
      </button>
    </div>
  );
};
