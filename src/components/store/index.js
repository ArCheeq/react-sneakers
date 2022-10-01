import { configureStore } from "@reduxjs/toolkit";
import sneakers from './slices/sneakersSlice';

const store = configureStore({
    reducer: {sneakers},
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;