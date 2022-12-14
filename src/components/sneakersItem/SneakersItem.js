import useToggleState from '../hooks/useToggleState';
import './sneakersItem.scss';

import likedBtn from "../../resources/img/likedBtn.svg";
import unLikedBtn from "../../resources/img/unlikedBtn.svg";
import addBtnChecked from "../../resources/img/addBtnChecked.svg";
import addBtn from "../../resources/img/addBtn.svg";

const SneakersItem = ({id, src, price, title, cart, favorite, profile}) => {

    const {onToggleCart, onToggleFavorite} = useToggleState();

    //Функция совмещает добавление информации на сервер элементов корзины и понравившихся, лучше не делать правок
    const onToggleSneakers = (type) => {
        const item = {
            id,
            src,
            price,
            title,
            cart,
            favorite
        };
        if (type === 'favorite') {
            item.favorite = !item.favorite;
            onToggleFavorite(item);
        } else if (type === 'cart'){
            item.cart = !item.cart;
            onToggleCart(item);
        }
    }

    return (
        <div className="sneakers__item" key={id}>
            <button className='like' onClick={() => onToggleSneakers('favorite')} style={profile ? {"display": "none"} : null}>
            <img width={32} height={32} src={favorite ? likedBtn : unLikedBtn} alt="like" />
            </button>
            <img width={133} height={112} src={src} alt="sneakers" className="sneakers__item__photo" />
            <div className="sneakers__item__name">{title}</div>
            <div className="sneakers__item__info">
            <div className="price">
                <p className='price__text'>Цена:</p>
                <b className='price__value'>{price} грн.</b>
            </div>
            <button className="toCartBtn" onClick={() => onToggleSneakers('cart')} style={profile ? {"display": "none"} : null}>
                <img width={32} height={32} src={cart ? addBtnChecked  : addBtn} alt="button" />
            </button>
            </div>
        </div>
    )
}

export default SneakersItem;