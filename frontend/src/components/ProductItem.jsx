import { useContext } from "react";
import { Link } from "react-router-dom";

import { ShopContext } from "../context/ShopContext";

export const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <div className="text-customeDarkPurple cursor-pointer">
      <Link to={`/product/${id}`} className="block">
        <div className="overflow-hidden">
          <img
            src={image[0]}
            alt={`Image ${id}`}
            className="hover:scale-110 transition ease duration-200"
          />
        </div>
        <p className="pt-3 pb-1 text-sm">{name}</p>
        <p className="text-sm font-medium">
          {currency}
          {price}
        </p>
      </Link>
    </div>
  );
};
