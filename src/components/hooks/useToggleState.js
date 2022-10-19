import { useHttp } from "./useHttp";
import { useDispatch } from "react-redux";
import { addCartSneakers, deleteCartSneakers } from "../store/slices/cartSlice";
import { toggleCart, toggleFavorite } from "../store/slices/sneakersSlice";

const useToggleState = () => {

    const dispatch = useDispatch();
    const {request} = useHttp();

    const onToggleCart = (payload) => {
        if (payload.cart) {
            console.log(payload);
            dispatch(addCartSneakers(payload));
            dispatch(toggleCart(payload.id));
            request("http://localhost:3001/cart", 'POST', JSON.stringify(payload));
            request(`http://localhost:3001/sneakers/${payload.id}`, 'PUT', JSON.stringify(payload));
        } else {
            console.log(payload);
            dispatch(deleteCartSneakers(payload.id));
            dispatch(toggleCart(payload.id));
            request(`http://localhost:3001/cart/${payload.id}`, 'DELETE');
            request(`http://localhost:3001/sneakers/${payload.id}`, 'PUT', JSON.stringify(payload));
        }
    }

    const onToggleFavorite = (payload) => {
        dispatch(toggleFavorite(payload.id));
        request(`http://localhost:3001/sneakers/${payload.id}`, 'PUT', JSON.stringify(payload));
    }

    return {onToggleCart, onToggleFavorite}
}

export default useToggleState;