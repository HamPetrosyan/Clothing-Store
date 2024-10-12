import { useContext, useEffect, useState } from "react";

import { ShopContext } from "../context/ShopContext";
import { ProductItem } from "../components/ProductItem";
import { Title } from "../components/Title";

import {
  assets,
  categoryValues,
  typeValues,
} from "../assets/frontend_assets/assets";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubcategory = (e) => {
    if (subcategory.includes(e.target.value)) {
      setSubcategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubcategory((prev) => [...prev, e.target.value]);
    }
  };

  useEffect(() => {
    let filteredProducts = products.slice();

    // Search Logic
    if (showSearch && search) {
      filteredProducts = filteredProducts.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category Filter
    if (category.length > 0) {
      filteredProducts = filteredProducts.filter((item) =>
        category.includes(item.category)
      );
    }

    // Subcategory Filter
    if (subcategory.length > 0) {
      filteredProducts = filteredProducts.filter((item) =>
        subcategory.includes(item.subCategory)
      );
    }

    // Sorting
    switch (sortType) {
      case "low-high":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilterProducts(filteredProducts);
  }, [products, category, subcategory, sortType, search, showSearch]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-borderPurple">
      {/* Filter Options */}
      <div className="min-w-40 lg:min-w-60 md:min-w-52">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="uppercase my-2 text-xl inline-flex items-center text-customeDarkPurple gap-2 cursor-pointer sm:cursor-auto"
        >
          Filters
          <img
            src={assets.dropdown_icon}
            alt="dropdown icon"
            className={`h-3 sm:hidden ${
              showFilter ? "rotate-90" : "rotate-[-90deg]"
            }`}
          />
        </p>

        {/* Category Filter */}
        <div
          className={`border border-borderPurple pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="uppercase mb-3 text-sm font-medium text-customeDarkPurple">
            Categories
          </p>
          <div className="flex flex-col gap-2 text-sm font-light text-customeDarkPurple">
            {categoryValues.map(({ id, label }) => (
              <p key={id}>
                <input
                  id={id}
                  type="checkbox"
                  className="checkbox-input"
                  value={label}
                  onClick={toggleCategory}
                />
                <label htmlFor={id} className="checkbox-label">
                  {label}
                </label>
              </p>
            ))}
          </div>
        </div>
        {/* Subcategory Filter */}

        <div
          className={`border border-borderPurple pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="uppercase mb-3 text-sm font-medium text-customeDarkPurple">
            Type
          </p>
          <div className="flex flex-col gap-2 text-sm font-light text-customeDarkPurple">
            {typeValues.map(({ id, label }) => (
              <p key={id}>
                <input
                  id={id}
                  type="checkbox"
                  className="checkbox-input"
                  value={label}
                  onChange={toggleSubcategory}
                />
                <label htmlFor={id} className="checkbox-label">
                  {label}
                </label>
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"All"} text2={"Collections"} />
          {/* Product Sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border border-borderPurple text-sm px-2 outline-none"
          >
            <option value="relevant">Sort by Relevant</option>
            <option value="low-high">Sort by Low to High</option>
            <option value="high-low">Sort by High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
