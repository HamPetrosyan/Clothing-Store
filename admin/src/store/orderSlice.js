import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../App";

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendUrl}/api/order/list`, {
        headers: { token },
      });
      return response.data.orders.reverse();
    } catch (error) {
      const message =
        error.response?.status === 404
          ? "Orders not found."
          : "An error occurred while fetching orders.";
      return rejectWithValue(message);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ orderId, status, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status },
        { headers: { token } }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue("An error occurred while updating order status.");
    }
  }
);

const initialState = {
  orders: [],
  status: "idle",
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const { orderId, status } = action.meta.arg;

        const index = state.orders.findIndex((order) => order._id === orderId);

        if (index !== -1) {
          state.orders[index] = {
            ...state.orders[index],
            status,
          };
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default ordersSlice.reducer;
