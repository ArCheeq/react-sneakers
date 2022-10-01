import {useHttp} from "../hooks/useHttp";
import { useDispatch } from "react-redux";
import { addSneakers, deleteSneakers } from "../store/slices/cartSlice";
import { toggleCart } from "../store/slices/sneakersSlice";
import './sneakersItem.scss';

const SneakersItem = ({id, src, price, title, cart}) => {

    const {request} = useHttp();
    const dispatch = useDispatch();

    const onAddToCart = () => {
        if (cart) {
            const item = {
                id,
                src,
                price,
                title,
                cart: false
            };
            dispatch(deleteSneakers(id));
            dispatch(toggleCart(id));
            request(`http://localhost:3001/cart/${id}`, 'DELETE');
            request(`http://localhost:3001/sneakers/${id}`, 'PUT', JSON.stringify(item));
        } else {
            const item = {
                id,
                src,
                price,
                title,
                cart: true
            };
            dispatch(addSneakers(item));
            dispatch(toggleCart(id));
            request("http://localhost:3001/cart", 'POST', JSON.stringify(item));
            request(`http://localhost:3001/sneakers/${id}`, 'PUT', JSON.stringify(item));
        }
    }

    return (
        <div className="sneakers__item" key={id}>
            <button className='like'>
            <img width={32} height={32} src={"/resources/img/unlikedBtn.svg"} alt="like" />
            </button>
            <img width={133} height={112} src={src} alt="sneakers" className="sneakers__item__photo" />
            <div className="sneakers__item__name">{title}</div>
            <div className="sneakers__item__info">
            <div className="price">
                <p className='price__text'>Цена:</p>
                <b className='price__value'>{price} грн.</b>
            </div>
            <button className="toCartBtn" onClick={onAddToCart}>
                <img width={32} height={32} src={cart ? "/resources/img/addBtnChecked.svg"  : "/resources/img/addBtn.svg"} alt="button" />
            </button>
            </div>
        </div>
    )
}

export default SneakersItem;