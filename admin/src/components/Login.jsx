import { useState } from "react";
import { toast } from "react-toastify";

import axios from "axios";

import { backendUrl } from "../App";
import { useNavigate } from "react-router-dom";

export const Login = ({ setToken }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@hampet.com");
  const [password, setPassword] = useState("admin_hampet777");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      const res = await axios.post(`${backendUrl}/api/user/admin`, {
        email,
        password,
      });

      if (res.data.success) {
        setToken(res.data.token);
        toast.success("Login successful!");
        navigate("/add");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full px-3">
      <div className="shadow-md bg-white shadow-customeNormPurple rounded-lg px-8 py-6 max-w-md w-full">
        <h1 className="text-2xl text-customeDarkPurple font-bold mb-4">
          Admin Panel
        </h1>
        <form onSubmit={onSubmitHandler} className="text-customeDarkPurple">
          <div className="mb-3">
            <p className="text-sm font-medium text-customeNormPurple mb-2">
              Email Address
            </p>
            <input
              type="email"
              placeholder="your@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-borderPurple placeholder:text-borderPurple focus:outline focus:outline-2 focus:outline-customeDarkPurple focus:border-transparent rounded py-1.5 px-3.5 w-full"
            />
          </div>
          <div className="mb-3">
            <p className="text-sm font-medium text-customeNormPurple mb-2">
              Email Password
            </p>
            <input
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-borderPurple placeholder:text-borderPurple focus:outline focus:outline-2 focus:outline-customeDarkPurple focus:border-transparent rounded py-1.5 px-3.5 w-full"
            />
          </div>
          <button className="bg-customeDarkPurple text-white py-2 px-4 rounded w-full mt-3">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
