import { assets } from "../assets/frontend_assets/assets";

export const Footer = () => {
  return (
    <>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} alt="logo" className="mb-5 w-44" />
          <p className="w-full md:w-2/3 text-customeNormPurple">
            HAMPET is a chic clothing shop dedicated to offering stylish and
            contemporary fashion for people. With a focus on the latest trends
            and quality materials, HamPet provides a curated selection of
            apparel that combines comfort with sophistication. Embrace your
            personal style with HamPet&apos;s diverse range of fashion-forward
            clothing.
          </p>
        </div>

        <div>
          <p className="uppercase font-medium text-xl mb-5 text-customeDarkPurple">
            Company
          </p>
          <ul className="flex flex-col gap-1 text-customeNormPurple">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className="uppercase text-xl font-medium mb-5 text-customeDarkPurple">
            Get in touch
          </p>
          <ul className="flex flex-col gap-1 text-customeNormPurple">
            <li>+1-212-456-7890</li>
            <li>contact@hampet.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr className="border-borderPurple" />
        <p className="py-5 text-sm text-center text-customeDarkPurple">
          &copy; Copyright 2024&#64; hampet.com - All Right Reserved.
        </p>
      </div>
    </>
  );
};
