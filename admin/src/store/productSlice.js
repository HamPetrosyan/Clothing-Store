import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { backendUrl } from "../App";

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        {
          headers: {
            token,
          },
        }
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.status === 404
          ? "Product not found."
          : "An error occurred while adding the product. Please try again.";
      return rejectWithValue(message);
    }
  }
);

export const fetchProductsList = createAsyncThunk(
  "product/fetchProductsList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      return response.data.products;
    } catch (error) {
      const message =
        error.response?.status === 404
          ? "Products not found."
          : "An error occurred while fetching the products. Please try again.";
      return rejectWithValue(message);
    }
  }
);

export const removeProduct = createAsyncThunk(
  "product/removeProduct",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${backendUrl}/api/product/remove`, {
        headers: {
          token,
        },
        data: { id },
      });
      return { id, message: response.data.message };
    } catch (error) {
      return rejectWithValue("An error occurred while removing the product.");
    }
  }
);

const initialState = {
  name: "",
  description: "",
  price: "",
  sizes: [],
  category: "Men",
  subCategory: "Topwear",
  bestseller: false,
  images: {
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  },
  productList: [],
  status: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setSizes: (state, action) => {
      state.sizes = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSubCategory: (state, action) => {
      state.subCategory = action.payload;
    },
    toggleBestseller: (state) => {
      state.bestseller = !state.bestseller;
    },
    setImage: (state, action) => {
      const { index, file } = action.payload;
      state.images[`image${index}`] = file;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.status = "succeeded";
        state.name = "";
        state.description = "";
        state.price = "";
        state.sizes = [];
        state.category = "Men";
        state.subCategory = "Topwear";
        state.bestseller = false;
        state.images = {
          image1: null,
          image2: null,
          image3: null,
          image4: null,
        };
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchProductsList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productList = action.payload;
      })
      .addCase(fetchProductsList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(removeProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productList = state.productList.filter(
          (product) => product._id !== action.payload.id
        );
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  setName,
  setDescription,
  setPrice,
  setSizes,
  setCategory,
  setSubCategory,
  toggleBestseller,
  setImage,
} = productSlice.actions;

export default productSlice.reducer;
