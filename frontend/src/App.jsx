import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Navbar } from "./Components/Navbar";
import { SearchBar } from "./Components/SearchBar";
import { Footer } from "./Components/Footer";
import { LoadingSpinner } from "./Components/Loading";
import ScrollToTop from "./Components/ScrollToTop";

const Home = lazy(() => import("./Pages/Home"));
const Collection = lazy(() => import("./Pages/Collection"));
const About = lazy(() => import("./Pages/About"));
const Contact = lazy(() => import("./Pages/Contact"));
const Product = lazy(() => import("./Pages/Product"));
const Cart = lazy(() => import("./Pages/Cart"));
const Login = lazy(() => import("./Pages/Login"));
const PlaceOrder = lazy(() => import("./Pages/PlaceOrder"));
const Orders = lazy(() => import("./Pages/Orders"));

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <ScrollToTop />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
};

export default App;
