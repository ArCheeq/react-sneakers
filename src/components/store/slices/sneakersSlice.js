import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/useHttp";

const initialState = {
    sneakers: [],
    sneakersLoadingStatus: 'idle',
    searchValue: '',
}

export const fetchSneakers = createAsyncThunk(
    'sneakers/fetchSneakers',
    () => {
        const {request} = useHttp();
        return request("http://localhost:3001/sneakers");
    }
)

const sneakersSlice = createSlice({
    name: 'sneakers',
    initialState,
    reducers: {
        changeSearchValue: (state, action) => {
            state.searchValue = action.payload;
        },
        toggleCart: (state, action) => {
            state.sneakers.forEach(item => {
                if (item.id === action.payload) {
                    item.cart = !item.cart;
                }
            });
        },
        toggleFavorite: (state, action) => {
            state.sneakers.forEach(item => {
                if (item.id === action.payload) {
                    item.favorite = !item.favorite;
                }
            });
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSneakers.pending, (state) => {
                state.sneakersLoadingStatus = 'loading';
            })
            .addCase(fetchSneakers.fulfilled, (state, action) => {
                state.sneakersLoadingStatus = 'idle';
                state.sneakers = action.payload;
            })
            .addCase(fetchSneakers.rejected, (state) => {
                state.sneakersLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
})

const {actions, reducer} = sneakersSlice;

export default reducer;
export const {changeSearchValue, toggleCart, toggleFavorite} = actions;