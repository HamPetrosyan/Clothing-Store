import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./productSlice";
import orderReducer from "./orderSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["product/setImage"],
        ignoredPaths: ["product.images"],
      },
    }),
});
