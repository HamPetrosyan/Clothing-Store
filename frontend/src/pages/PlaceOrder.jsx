import { useContext, useState } from "react";
import { toast } from "react-toastify";

import axios from "axios";

import { ShopContext } from "../context/ShopContext";
import { Title } from "../components/Title";
import { CartTotal } from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";

const PlaceOrder = () => {
  const {
    navigate,
    delivery_fee,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    products,
    getCartAmount,
  } = useContext(ShopContext);
  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let orderItems = [];

      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === itemId)
            );

            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItems[itemId][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "cod":
          const res = await axios.post(
            `${backendUrl}/api/order/place`,
            orderData,
            {
              headers: { token },
            }
          );

          if (res.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(res.data.message);
          }

          break;

        case "stripe":
          const resStripe = await axios.post(
            `${backendUrl}/api/order/stripe`,
            orderData,
            {
              headers: { token },
            }
          );

          if (resStripe.data.success) {
            const { session_url } = resStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(resStripe.data.message);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col md:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* Left Side */}
      <div className="flex flex-col gap-4 w-full md:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"Delivery"} text2={"Information"} />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={onChangeHandler}
            required
            className="border border-borderPurple placeholder:text-borderPurple focus:outline focus:outline-2 focus:outline-customeDarkPurple focus:border-transparent rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={onChangeHandler}
            required
            className="border border-borderPurple placeholder:text-borderPurple focus:outline focus:outline-2 focus:outline-customeDarkPurple focus:border-transparent rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={onChangeHandler}
          required
          className="border border-borderPurple placeholder:text-borderPurple focus:outline focus:outline-2 focus:outline-customeDarkPurple focus:border-transparent rounded py-1.5 px-3.5 w-full"
        />
        <input
          type="text"
          name="street"
          placeholder="Street"
          value={formData.street}
          onChange={onChangeHandler}
          required
          className="border border-borderPurple placeholder:text-borderPurple focus:outline focus:outline-2 focus:outline-customeDarkPurple focus:border-transparent rounded py-1.5 px-3.5 w-full"
        />
        <div className="flex gap-3">
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={onChangeHandler}
            required
            className="border border-borderPurple placeholder:text-borderPurple focus:outline focus:outline-2 focus:outline-customeDarkPurple focus:border-transparent rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={onChangeHandler}
            required
            className="border border-borderPurple placeholder:text-borderPurple focus:outline focus:outline-2 focus:outline-customeDarkPurple focus:border-transparent rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={onChangeHandler}
            required
            className="border border-borderPurple placeholder:text-borderPurple focus:outline focus:outline-2 focus:outline-customeDarkPurple focus:border-transparent rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            name="zipcode"
            placeholder="Zipcode"
            value={formData.zipcode}
            onChange={onChangeHandler}
            required
            className="border border-borderPurple placeholder:text-borderPurple focus:outline focus:outline-2 focus:outline-customeDarkPurple focus:border-transparent rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          value={formData.phone}
          onChange={onChangeHandler}
          required
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
          <div className="flex gap-3 flex-col sm:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border border-borderPurple px-3 py-2 cursor-pointer min-w-[200px] h-[50px] justify-between"
            >
              <p
                className={`min-w-3.5 h-3.5 border border-borderPurple rounded-full ${
                  method === "stripe" ? "bg-customeNormPurple" : ""
                }`}
              ></p>
              <img src={assets.stripe_logo} alt="stripe logo" className="h-8" />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center border gap-5 border-borderPurple px-3 py-2 cursor-pointer min-w-[200px] h-[50px] justify-between"
            >
              <p
                className={`min-w-3.5 h-3.5 border border-borderPurple rounded-full ${
                  method === "cod" ? "bg-customeNormPurple" : ""
                }`}
              ></p>
              <p className="text-customeNormPurple uppercase">
                Cash on delivery
              </p>
            </div>
          </div>
        </div>

        <div className="w-full text-end mt-5">
          <button
            disabled={Object.keys(cartItems).length === 0}
            className={`uppercase bg-customeNormPurple text-white px-16 py-3 text-sm transition-colors duration-200 ${
              Object.keys(cartItems).length === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-customeDarkPurple"
            }`}
          >
            Place Order
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
