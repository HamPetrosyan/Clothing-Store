import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      if (!token) {
        return;
      }

      const res = await axios.post(
        `${backendUrl}/api/order/verifyStripe`,
        {
          success,
          orderId,
        },
        { headers: { token } }
      );

      if (res.data.success) {
        setCartItems({});
        navigate("/orders");
        toast.success(
          "Payment verified! Your order has been placed successfully."
        );
      }
    } catch (error) {
      navigate("/cart");
      toast.error("Payment verification failed. Please try again.");
      console.log(error);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return <div>Verify</div>;
};

export default Verify;
