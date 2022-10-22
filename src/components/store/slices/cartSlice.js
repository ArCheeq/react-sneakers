import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/useHttp";

const initialState = {
    isCartOpen: false,
    sneakers: [],
    sneakersLoadingStatus: 'idle',
    totalPrice: 0,
}

export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    () => {
        const {request} = useHttp();
        return request("http://localhost:3001/cart");
    }
)

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        cartIsActive: (state) => {
            state.isCartOpen = !state.isCartOpen;
        },
        addCartSneakers: (state, action) => {
            state.sneakers.push(action.payload);
        },
        deleteCartSneakers: (state, action) => {
            state.sneakers = state.sneakers.filter(item => item.id !== action.payload);
        },
        countTotalPrice: (state) => {
            state.totalPrice = state.sneakers.reduce((sum, obj) => obj.price + sum, 0); 
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.sneakersLoadingStatus = 'loading';
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.sneakersLoadingStatus = 'idle';
                state.sneakers = action.payload;
            })
            .addCase(fetchCart.rejected, (state) => {
                state.sneakersLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
})

const {actions, reducer} = cartSlice;

export default reducer;
export const {cartIsActive, addCartSneakers, deleteCartSneakers, countTotalPrice} = actions;