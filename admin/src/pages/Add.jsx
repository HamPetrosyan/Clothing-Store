import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { assets } from "../assets/admin_assets/assets";
import {
  addProduct,
  setCategory,
  setDescription,
  setImage,
  setName,
  setPrice,
  setSizes,
  setSubCategory,
  toggleBestseller,
} from "../store/productSlice";

const imagesArr = [1, 2, 3, 4];

const sizesArr = ["S", "M", "L", "XL", "XXL"];

const Add = ({ token }) => {
  const dispatch = useDispatch();
  const {
    name,
    description,
    price,
    sizes,
    category,
    subCategory,
    bestseller,
    images,
  } = useSelector((state) => state.product);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("bestseller", bestseller);
    formData.append("sizes", JSON.stringify(sizes));

    Object.keys(images).forEach((key, index) => {
      if (images[key]) {
        formData.append(`image${index + 1}`, images[key]);
      }
    });

    try {
      await dispatch(addProduct({ formData, token })).unwrap();
      toast.success("Product added successfully!");
    } catch (err) {
      toast.error(`Failed to add product: ${err || "Unknown error"}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full items-start gap-3 text-customeNormPurple"
    >
      <div>
        <p className="mb-2">Upload Image</p>

        <div className="flex gap-2">
          {imagesArr.map((i) => (
            <label key={i} htmlFor={`image${i}`}>
              <img
                src={
                  !images[`image${i}`]
                    ? assets.upload_area
                    : URL.createObjectURL(images[`image${i}`])
                }
                alt="upload"
                className="w-20"
              />
              <input
                type="file"
                id={`image${i}`}
                hidden
                onChange={(e) =>
                  dispatch(setImage({ index: i, file: e.target.files[0] }))
                }
              />
            </label>
          ))}
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          type="text"
          placeholder="Type here"
          required
          value={name}
          onChange={(e) => dispatch(setName(e.target.value))}
          className="w-full max-w-[500px] px-3 py-2 border border-borderPurple placeholder:text-borderPurple focus:outline focus:outline-2 focus:outline-customeDarkPurple focus:border-transparent rounded"
        />
      </div>

      <div className="w-full ">
        <p className="mb-2">Product description</p>
        <textarea
          type="text"
          placeholder="Write content here"
          required
          value={description}
          onChange={(e) => dispatch(setDescription(e.target.value))}
          className="w-full max-w-[500px] px-3 py-2 border border-borderPurple placeholder:text-borderPurple focus:outline focus:outline-2 focus:outline-customeDarkPurple focus:border-transparent rounded"
        />
      </div>

      <div className="flex flex-col items-center sm:flex-row gap-2 w-full sm:gap-7">
        <div className="w-full max-w-[134px]">
          <p className="mb-2">Product category</p>
          <select
            value={category}
            onChange={(e) => dispatch(setCategory(e.target.value))}
            className="border border-borderPurple outline-customeDarkPurple w-full px-3 py-2"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div className="w-full max-w-[134px]">
          <p className="mb-2">Sub category</p>
          <select
            value={subCategory}
            onChange={(e) => dispatch(setSubCategory(e.target.value))}
            className="border border-borderPurple outline-customeDarkPurple w-full px-3 py-2"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div className="w-full max-w-[134px]">
          <p className="mb-2">Prdouct Price</p>
          <input
            type="number"
            placeholder="25"
            value={price}
            onChange={(e) => dispatch(setPrice(e.target.value))}
            className="w-full px-3 py-2 border border-borderPurple outline-customeDarkPurple"
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3 text-customeDarkPurple flex-wrap">
          {sizesArr.map((size) => (
            <div
              key={size}
              onClick={() => {
                const newSizes = sizes.includes(size)
                  ? sizes.filter((item) => item !== size)
                  : [...sizes, size];

                dispatch(setSizes(newSizes));
              }}
            >
              <p
                className={`${
                  sizes.includes(size)
                    ? "bg-customeNormPurple text-white"
                    : "bg-bgPurple"
                } border border-customeDarkPurple px-3 py-1 cursor-pointer`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <input
          type="checkbox"
          id="bestseller"
          onChange={() => dispatch(toggleBestseller())}
          checked={bestseller}
          className="checkbox-input"
        />
        <label htmlFor="bestseller" className="checkbox-label">
          Add to bestseller
        </label>
      </div>

      <button className="w-28 py-3 mt-4 bg-customeNormPurple hover:bg-customeDarkPurple text-white uppercase transition-colors duration-150">
        Add
      </button>
    </form>
  );
};

export default Add;
