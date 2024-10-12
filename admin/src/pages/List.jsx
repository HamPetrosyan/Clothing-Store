import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsList, removeProduct } from "../store/productSlice";
import { currency } from "../App";

const List = ({ token }) => {
  const dispatch = useDispatch();
  const { productList, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProductsList());
  }, [dispatch]);

  const handleRemoveProduct = (id) => {
    dispatch(removeProduct({ id, token }));
  };

  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center px-2 py-1 bg-bgPurple text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {error && <p>{error}</p>}

        {/* Product List */}
        {productList.length > 0 ? (
          productList.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-3 md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 px-2 py-1 border border-borderPurple text-sm text-customeNormPurple hover:text-customeDarkPurple hover:bg-bgPurple transition-colors duration-300"
            >
              <img src={item.image[0]} alt={item.name} className="w-12" />
              <p className="truncate">{item.name}</p>
              <p>{item.category}</p>
              <p className="col-start-2 md:col-start-4">
                {currency}
                {item.price}
              </p>
              <p
                className="md:text-center cursor-pointer text-lg"
                onClick={() => handleRemoveProduct(item._id)}
              >
                X
              </p>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </>
  );
};

export default List;
