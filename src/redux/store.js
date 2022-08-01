import { configureStore } from "@reduxjs/toolkit";
import areaReducer from "./modules/areaSlice";
import categoryReducer from "./modules/categorySlice";

const store = configureStore({
    reducer: {
        area: areaReducer,
        category: categoryReducer
    }
});

export default store;