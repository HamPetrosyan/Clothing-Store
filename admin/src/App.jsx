import { lazy, Suspense, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import { LoadingSpinner } from "./components/Loading";
import { Login } from "./components/Login";

const Add = lazy(() => import("./pages/Add"));
const List = lazy(() => import("./pages/List"));
const Orders = lazy(() => import("./pages/Orders"));

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "$";

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div>
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr className="border-borderPurple" />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw, 25px)] my-8 text-customeDarkPurple text-base">
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/add" element={<Add token={token} />} />
                  <Route path="/list" element={<List token={token} />} />
                  <Route path="/orders" element={<Orders token={token} />} />
                </Routes>
              </Suspense>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
