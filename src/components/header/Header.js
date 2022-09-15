import './header.scss';
import { Link } from 'react-router-dom';

const Header = ({onClickCart}) => {
    return (
        <header className="header">
          <Link to="/">
            <div className="header__left">
              <img width={40} height={40} src="/resources/img/logo.svg" alt="react-sneakers" className="logo" />
              <div>
                <h2 className='brand'>REACT SNEAKERS</h2>
                <p className='tagline'>Магазин лучших кроссовок</p>
              </div>
            </div>
          </Link>
          <div className="header__right">
            <div className="cart" onClick={onClickCart}>
              <img width={18} height={17} src="/resources/img/cart.svg" alt="cart"/>
              <div className="totalPrice">1205 грн.</div>
            </div>
            <div className="favourite">
              <Link to="/favorites">
                <img width={21} height={19} src="/resources/img/favourite.svg" alt="favourite" />
              </Link>
            </div>
            <div className="userProfile">
              <img width={20} height={20} src="/resources/img/user.svg" alt="userProfile" />
            </div>
          </div>
        </header>
    )
}

export default Header;