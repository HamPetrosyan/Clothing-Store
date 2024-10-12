import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import { RelatedProducts } from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProductData = () => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  const handleAddToCart = () => {
    if (size === "") {
      setErrorMessage("Select Product Size.");
    } else {
      setErrorMessage("");
      addToCart(productData._id, size);
    }
  };

  return productData ? (
    <div className="border-t border-borderPurple pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-8 flex-col md:flex-row">
        {/* Product Images */}
        <div className="flex flex-col-reverse gap-3 md:flex-row">
          <div className="flex md:flex-col overflow-x-auto md:overflow-y-scroll justify-between md:justify-normal md:w-[18.7%] w-full">
            {productData.image.map((item, idx) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                alt={`image ${idx}`}
                key={idx}
                className="w-[24%] md:w-full md:h-[30%] sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full md:w-[80%]">
            <img src={image} alt="image" className="w-full h-full" />
          </div>
        </div>
        {/* Product Info */}
        <div className="flex-1 text-customeDarkPurple">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-2xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-customeNormPurple md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, idx) => (
                <button
                  onClick={() => setSize(item)}
                  key={idx}
                  className={`border py-2 px-4 bg-bgPurple ${
                    item === size ? "border-customeDarkPurple" : null
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          {errorMessage && (
            <p className="text-customeDarkPurple my-4">{errorMessage}</p>
          )}
          <button
            onClick={handleAddToCart}
            className="uppercase bg-customeNormPurple text-white px-8 py-3 text-sm active:bg-customeDarkPurple"
          >
            Add to cart
          </button>
          <hr className="mt-8 sm:4/5" />
          <div className="text-sm text-customeNormPurple mt-5 flex flex-col gap-1">
            <p>100% Original Product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* Description & Review Section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border border-r-0 border-b-0 border-borderPurple px-5 py-3 text-sm">
            Description
          </b>
          <p className="border border-borderPurple border-b-0 px-5 py-3 text-sm">
            Reviews (122)
          </p>
        </div>
        <div className="flex flex-col gap-4 border border-borderPurple px-6 py-6 text-sm text-customeNormPurple">
          <p>
            An e-commerce website is a platform that facilitates the buying and
            selling of products or services over the internet. It serves as a
            virtual marketplace where businesses and individuals can showcase
            their products, interact with customers, and conduct transactions
            without the need for a physical presence. E-commerce websites have
            gained immense popularity due to their convenience, accessibility,
            and the global reach they offer.
          </p>
          <p>
            An e-commerce website typically displays products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      </div>
      {/* Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
