import { assets } from "../assets/frontend_assets/assets";

export const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row shadow-shadowPurple shadow-md hover:shadow-lg hover:shadow-shadowPurple transition-all duration-200">
      {/* Hero Left Side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-customeDarkPurple">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-customeDarkPurple"></p>
            <p className="font-medium text-sm md:text-base uppercase">
              Our Bestseller
            </p>
          </div>
          <h1 className="prata-regular text-3xl sm:py-3 lg:text-4xl leading-relaxed">
            <span className="prata-regular text-customeNormPurple">
              Latest{" "}
            </span>
            Arrivals
          </h1>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base uppercase">
              Shop Now
            </p>
            <p className="w-8 md:w-11 h-[2px] bg-customeDarkPurple"></p>
          </div>
        </div>
      </div>
      {/* Hero Right Side */}
      <img className="w-full sm:w-1/2" src={assets.hero_img} alt="hero image" />
    </div>
  );
};
