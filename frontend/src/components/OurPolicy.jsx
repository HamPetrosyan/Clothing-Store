import { policyValues } from "../assets/frontend_assets/assets";

export const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-customeDarkPurple">
      {policyValues.map(({ imgSrc, altText, title, description }) => (
        <div key={title}>
          <img src={imgSrc} alt={altText} className="w-12 m-auto mb-5" />
          <p className="font-semibold">{title}</p>
          <p className="text-customeNormPurple">{description}</p>
        </div>
      ))}
    </div>
  );
};
