import { configureStore } from "@reduxjs/toolkit";
import sneakers from './slices/sneakersSlice';
import cart from './slices/cartSlice';

const store = configureStore({
    reducer: {sneakers, cart},
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;