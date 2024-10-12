import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, updateOrderStatus } from "../store/orderSlice";
import { toast } from "react-toastify";
import { currency } from "../App";

const Orders = ({ token }) => {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.order);

  useEffect(() => {
    if (token) {
      dispatch(fetchOrders(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleStatusChange = (e, orderId) => {
    const status = e.target.value;
    dispatch(updateOrderStatus({ orderId, status, token }))
      .unwrap()
      .then((response) => {
        toast.success(response.message);
        dispatch(fetchOrders(token));
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {orders.map((order) => (
          <div
            key={`${order._id}-${order.size}`}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-borderPurple p-5 md:p-8 my-3 md:my-4 sm:text-sm text-customeDarkPurple "
          >
            <img
              src={order.items[0]?.image[0]}
              className="w-20"
              alt="Order Item"
            />
            <div>
              <div>
                {order.items.map((item, idx) => (
                  <p key={idx} className="py-0.5">
                    {item.name} x {item.quantity} <span>{item.size}</span>
                    {idx < order.items.length - 1 && ","}
                  </p>
                ))}
              </div>
              <p className="mt-3 mb-2 font-medium">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div>
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">
                Items: {order.items.length}
              </p>
              <p className="mt-3">Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? "Done" : "Pending"}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-sm sm:text-[15px]">
              {currency}
              {order.amount}
            </p>
            <select
              onChange={(e) => handleStatusChange(e, order._id)}
              value={order.status}
              className="p-2 font-semibold border-2 border-borderPurple outline-none"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
