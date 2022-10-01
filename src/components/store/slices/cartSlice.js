import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/useHttp";

const initialState = {
    isCartOpen: false,
    sneakers: [],
    sneakersLoadingStatus: 'idle',
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
        addSneakers: (state, action) => {
            state.sneakers.push(action.payload);
        },
        deleteSneakers: (state, action) => {
            state.sneakers = state.sneakers.filter(item => item.id != action.payload);
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
export const {cartIsActive, addSneakers, deleteSneakers} = actions;