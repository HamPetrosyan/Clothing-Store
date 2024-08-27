import { useContext, useState } from "react";
import { assets } from "../Assets/frontend_assets/assets";
import { CartTotal } from "../Components/CartTotal";
import { Title } from "../Components/Title";
import { ShopContext } from "../Context/ShopContext";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const { navigate } = useContext(ShopContext);

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* Left Side */}
      <div className="flex flex-col gap-4 w-full md:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"Delivery"} text2={"Information"} />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="First name"
            className="border border-borderPurple placeholder:text-borderPurple focus:outline focus:outline-2 focus:outline-customeDarkPurple focus:border-transparent rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            placeholder="Last name"
            className="border border-borderPurple placeholder:text-borderPurple focus:outline focus:outline-2 focus:outline-customeDarkPurple focus:border-transparent rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          type="email"
          placeholder="Email address"
          className="border border-borderPurple placeholder:text-borderPurple focus:outline focus:outline-2 focus:outline-customeDarkPurple focus:border-transparent rounded py-1.5 px-3.5 w-full"
        />
        <input
          type="email"
          placeholder="Street"
          className="border border-borderPurple placeholder:text-borderPurple focus:outline focus:outline-2 focus:outline-customeDarkPurple focus:border-transparent rounded py-1.5 px-3.5 w-full"
        />
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Country"
            className="border border-borderPurple placeholder:text-borderPurple focus:outline focus:outline-2 focus:outline-customeDarkPurple focus:border-transparent rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            placeholder="City"
            className="border border-borderPurple placeholder:text-borderPurple focus:outline focus:outline-2 focus:outline-customeDarkPurple focus:border-transparent rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="State"
            className="border border-borderPurple placeholder:text-borderPurple focus:outline focus:outline-2 focus:outline-customeDarkPurple focus:border-transparent rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            placeholder="Zipcode"
            className="border border-borderPurple placeholder:text-borderPurple focus:outline focus:outline-2 focus:outline-customeDarkPurple focus:border-transparent rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          type="tel"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder="Phone"
          className="border border-borderPurple placeholder:text-borderPurple focus:outline focus:outline-2 focus:outline-customeDarkPurple focus:border-transparent rounded py-1.5 px-3.5 w-full"
        />
      </div>
      {/* Right Side */}
      <div className="mt-8 ml-5">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"Payment"} text2={"Method"} />
          {/* Payment Method Selection */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("visa")}
              className="flex items-center gap-3 border border-borderPurple px-3 cursor-pointer min-w-28"
            >
              <p
                className={`min-w-3.5 h-3.5 border border-borderPurple rounded-full ${
                  method === "visa" ? "bg-customeNormPurple" : ""
                }`}
              ></p>
              <img src={assets.visa_logo} alt="stripe logo" className="h-12" />
            </div>
            <div
              onClick={() => setMethod("masterCard")}
              className="flex items-center gap-3 border border-borderPurple px-3 cursor-pointer min-w-28"
            >
              <p
                className={`min-w-3.5 h-3.5 border border-borderPurple rounded-full ${
                  method === "masterCard" ? "bg-customeNormPurple" : ""
                }`}
              ></p>
              <img
                src={assets.masterCard_logo}
                alt="stripe logo"
                className="h-12 pt-2 mx-4"
              />
            </div>
            <div
              onClick={() => setMethod("americanExpress")}
              className="flex items-center gap-3 border border-borderPurple px-3 cursor-pointer min-w-28"
            >
              <p
                className={`min-w-3.5 h-3.5 border border-borderPurple rounded-full ${
                  method === "americanExpress" ? "bg-customeNormPurple" : ""
                }`}
              ></p>
              <img
                src={assets.american_express_logo}
                alt="stripe logo"
                className="h-12 mx-4"
              />
            </div>
          </div>
          <div
            onClick={() => setMethod("cod")}
            className="flex items-center gap-5 border border-borderPurple px-3 py-2 mt-3 cursor-pointer"
          >
            <p
              className={`min-w-3.5 h-3.5 border border-borderPurple rounded-full ${
                method === "cod" ? "bg-customeNormPurple" : ""
              }`}
            ></p>
            <p className="text-customeNormPurple uppercase">Cash on delivery</p>
          </div>
        </div>
        <div className="w-full text-end mt-8">
          <button
            onClick={() => navigate("/orders")}
            className="uppercase bg-customeNormPurple text-white px-16 py-3 text-sm"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
