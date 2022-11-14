import { useDispatch, useSelector } from 'react-redux';
import { cartIsActive } from '../store/slices/cartSlice';
import './header.scss';

import logo from "../../resources/img/logo.svg";
import cart from "../../resources/img/cart.svg";
import favorite from "../../resources/img/favourite.svg";
import user from "../../resources/img/user.svg";

import { Link } from 'react-router-dom';

const Header = () => {
      
      const dispatch = useDispatch();
      const {totalPrice} = useSelector(state => state.cart);

      const onOpenCart = () => {
        dispatch(cartIsActive());
      }

      return (
        <header className="header">
          <Link to="/" className="header__left">
            <img width={40} height={40} src={logo} alt="react-sneakers" className="logo" />
            <div>
              <h2 className='brand'>REACT SNEAKERS</h2>
              <p className='tagline'>Магазин лучших кроссовок</p>
            </div>
          </Link>
          <div className="header__right">
            <Link className="cart" onClick={onOpenCart}>
              <img width={18} height={17} src={cart} alt="cart"/>
              <div className="totalPrice">{totalPrice} грн.</div>
            </Link>
            <Link to="/favorites" className="favourite">
              <img width={21} height={19} src={favorite} alt="favourite" />
            </Link>
            <Link to="/profile" className="userProfile">
              <img width={20} height={20} src={user} alt="userProfile" />
            </Link>
          </div>
        </header>
    )
}

export default Header;

