import { useContext } from "react";

import { ShopContext } from "../Context/ShopContext";
import { Title } from "../Components/Title";

const Orders = () => {
  const { products, currency } = useContext(ShopContext);
  const date = new Date();

  const formattedDate = `${date.getDate().toString().padStart(2, "0")}.${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}.${date.getFullYear()}`;

  return (
    <div className="border-t border-borderPurple pt-16">
      <div className="text-2xl">
        <Title text1={"My"} text2={"Orders"} />
      </div>
      <div>
        {products.slice(1, 4).map((item, index) => (
          <div
            key={item.id}
            className={`${
              index === products.slice(1, 4).length - 1
                ? "border-b border-t"
                : "border-t"
            } border-borderPurple py-4 text-customeDarkPurple flex flex-col md:flex-row md:items-center md:justify-between gap-4`}
          >
            <div className="flex items-start gap-6 text-sm">
              <img src={item.image[0]} alt={`image`} className="w-16 sm:w-20" />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-2 text-base text-customeDarkPurple">
                  <p className="text-lg">
                    {currency} {item.price}
                  </p>
                  <p>Quantity: 1</p>
                  <p>Size: M</p>
                </div>
                <p className="text-customeDarkPurple">
                  Date:{" "}
                  <span className="text-customeNormPurple">
                    {formattedDate}
                  </span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-customeNormPurple"></p>
                <p className="text-sm sm:text-base">Ready to ship</p>
              </div>
              <button className="border border-borderPurple px-4 py-2 text-sm font-medium rounded-sm">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
