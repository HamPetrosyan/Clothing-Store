import { useContext, useEffect, useState } from "react";

import { ShopContext } from "../context/ShopContext";
import { Title } from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import { CartTotal } from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            tempData.push({
              _id: itemId,
              size,
              quantity: cartItems[itemId][size],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t border-borderPurple pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"Your"} text2={"Cart"} />
      </div>
      {cartData.length === 0 ? (
        <p className="text-lg text-customeNormPurple underline underline-offset-4">
          Your cart is empty.
        </p>
      ) : (
        <>
          {cartData.map((item) => {
            const productData = products.find(
              (product) => product._id === item._id
            );
            return (
              <div
                key={`${item._id}-${item.size}`}
                className="py-4 border-t border-b text-customeNormPurple grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                <div className="flex items-start gap-6">
                  <img
                    className="w-16 sm:w-20"
                    src={productData.image[0]}
                    alt="image"
                  />
                  <div>
                    <p className="text-xs sm:text-lg font-medium">
                      {productData.name}
                    </p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>
                        {currency}
                        {productData.price}
                      </p>
                      <p className="px-2 sm:px-3 sm:py-1 border border-customeDarkPurple bg-bgPurple ">
                        {item.size}
                      </p>
                    </div>
                  </div>
                </div>
                <input
                  onChange={(e) =>
                    e.target.value === "" || e.target.value === "0"
                      ? null
                      : updateQuantity(
                          item._id,
                          item.size,
                          Number(e.target.value)
                        )
                  }
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                  className="custom-number-input border border-borderPurple max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 text-customeDarkPurple bg-bgPurple"
                />
                <img
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  className="w-4 mr-4 sm:w-5 cursor-pointer"
                  src={assets.bin_icon}
                  alt="bin icon"
                />
              </div>
            );
          })}
        </>
      )}
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => {
                if (cartData.length > 0) {
                  navigate("/place-order");
                }
              }}
              className={`uppercase bg-customeDarkPurple text-white text-sm my-8 px-8 py-3 ${
                cartData.length === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-customeDarkPurple"
              }`}
              disabled={cartData.length === 0}
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
