import { useContext, useEffect, useState } from "react";

import { ShopContext } from "../context/ShopContext";
import { Title } from "../components/Title";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const date = new Date();

  const formattedDate = `${date.getDate().toString().padStart(2, "0")}.${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}.${date.getFullYear()}`;

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }

      const res = await axios.get(`${backendUrl}/api/order/userorders`, {
        headers: { token },
      });

      if (res.data.success) {
        let allOrdersItem = [];

        res.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrdersItem.push(item);
          });
        });

        setOrderData(allOrdersItem);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load order data. Please try again later.");
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t border-borderPurple pt-16">
      <div className="text-2xl">
        <Title text1={"My"} text2={"Orders"} />
      </div>
      <div>
        {orderData.map((item, index) => (
          <div
            key={`${item._id}-${item.size}-${item.date}`}
            className={`${
              index === orderData.length - 1 ? "border-b border-t" : "border-t"
            } border-borderPurple py-4 text-customeDarkPurple flex flex-col md:flex-row md:items-center md:justify-between gap-4`}
          >
            <div className="flex items-start gap-6 text-sm">
              <img src={item.image[0]} alt={`image`} className="w-16 sm:w-20" />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-1 text-base text-customeDarkPurple">
                  <p>
                    {currency} {item.price}{" "}
                  </p>
                  <p className="text-customeDarkPurple">
                    Quantity:{" "}
                    <span className="text-customeNormPurple">
                      {item.quantity}
                    </span>
                  </p>
                  <p className="text-customeDarkPurple">
                    Size:{" "}
                    <span className="text-customeNormPurple">{item.size}</span>
                  </p>
                </div>
                <p className="text-customeDarkPurple mt-1">
                  Date:{" "}
                  <span className="text-customeNormPurple">
                    {formattedDate}
                  </span>
                </p>
                <p className="text-customeDarkPurple mt-1">
                  Payment:{" "}
                  <span className="text-customeNormPurple">
                    {item.paymentMethod}
                  </span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-customeNormPurple"></p>
                <p className="text-sm sm:text-base">{item.status}</p>
              </div>
              <button
                onClick={loadOrderData}
                className="border border-borderPurple px-4 py-2 text-sm font-medium rounded-sm"
              >
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
