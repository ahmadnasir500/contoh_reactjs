import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { reqQuran } from "../services/quran";
import { reqBlog } from "../services/blog";
export const store = configureStore({
  reducer: {
    [reqQuran.reducerPath]: reqQuran.reducer,
    [reqBlog.reducerPath]: reqBlog.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return  getDefaultMiddleware({
      serializableCheck: false,
    }).concat([reqQuran.middleware,reqBlog.middleware])
  },
});
setupListeners(store.dispatch);