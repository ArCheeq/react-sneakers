import { useHttp } from "../hooks/useHttp";
import { useDispatch } from "react-redux";
import { deleteSneakers } from "../store/slices/cartSlice";
import { toggleCart } from "../store/slices/sneakersSlice";

const CartItem = ({id, src, price, title}) => {

    const {request} = useHttp();
    const dispatch = useDispatch();

    const onDeleteFromCart = () => {
        dispatch(deleteSneakers(id));
        dispatch(toggleCart(id));
        request(`http://localhost:3001/cart/${id}`, 'DELETE');
    }
    
    return (
        <div className="sidebar__offerList__item" key={id}>
          <img width={70} height={70} src={src} alt={title} className="sneakers__offer__img" />
          <div className="sidebar__offerList__item__info">
            <p className="sneakersName">
              {title}
            </p>
            <p className="sneakers__price">
              {price} грн.
            </p>
          </div>
          <button className="deleteSneakers" onClick={onDeleteFromCart}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="white" stroke="#F2F2F2"/>
            <path d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z" fill="#B5B5B5"/>
            </svg>
          </button>
        </div>
    )
}

export default CartItem;