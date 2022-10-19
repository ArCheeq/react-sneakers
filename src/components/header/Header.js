import { useDispatch } from 'react-redux';
import { cartIsActive } from '../store/slices/cartSlice';
import './header.scss';

import { Link } from 'react-router-dom';

const Header = () => {
      
      const dispatch = useDispatch();

      const onOpenCart = () => {
        dispatch(cartIsActive());
      }

      return (
        <header className="header">
          <Link to="/" className="header__left">
            <img width={40} height={40} src="/resources/img/logo.svg" alt="react-sneakers" className="logo" />
            <div>
              <h2 className='brand'>REACT SNEAKERS</h2>
              <p className='tagline'>Магазин лучших кроссовок</p>
            </div>
          </Link>
          <div className="header__right">
            <Link className="cart" onClick={onOpenCart}>
              <img width={18} height={17} src="/resources/img/cart.svg" alt="cart"/>
              <div className="totalPrice">1205 грн.</div>
            </Link>
            <Link to="/favorites" className="favourite">
              <img width={21} height={19} src="/resources/img/favourite.svg" alt="favourite" />
            </Link>
            <Link to="/profile" className="userProfile">
              <img width={20} height={20} src="/resources/img/user.svg" alt="userProfile" />
            </Link>
          </div>
        </header>
    )
}

export default Header;

