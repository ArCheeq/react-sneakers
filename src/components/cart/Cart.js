import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartIsActive, countTotalPrice } from '../store/slices/cartSlice';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { deleteCartSneakers } from '../store/slices/cartSlice';
import { toggleCart } from '../store/slices/sneakersSlice';
import CartItem from '../cartItem/CartItem';
import { useRef, useState } from 'react';

import { useHttp } from '../hooks/useHttp';

import './cart.scss';

const Cart = () => {

  const {request} = useHttp();
  const dispatch = useDispatch();
  const {sneakers} = useSelector(state => state.cart);
  const {isCartOpen} = useSelector(state => state.cart);
  const {totalPrice} = useSelector(state => state.cart);
  const nodeRef = useRef(null);
  const [IsOffer, setIsOffer] = useState(false);

  useEffect(() => {
    dispatch(countTotalPrice());
    // eslint-disable-next-line
  }, [sneakers])

  const onCloseCart = () => {
    dispatch(cartIsActive());
  }

  const clearCart = () => {
    sneakers.forEach(element => {
        const item = {
          id: element.id,
          src: element.src,
          price: element.price,
          title: element.title,
          cart: false
        };
        dispatch(deleteCartSneakers(element.id));
        dispatch(toggleCart(element.id));
        request(`http://localhost:3001/cart/${element.id}`, 'DELETE');
        request(`http://localhost:3001/sneakers/${element.id}`, 'PUT', JSON.stringify(item));
    });
  }

  const orderPurchase = () => {
    if (sneakers.length > 0) {
      request("http://localhost:3001/offerList", "POST", JSON.stringify(sneakers));
      clearCart();
      setIsOffer(true);

      setTimeout(() => {
        setIsOffer(false);
      }, 5000);
    }
  }

  const renderCartItems = (arr) => {
    if (IsOffer) {
      return <CSSTransition timeout={500} classNames="cart__offer">
                <ActiveOfferCart onClose={onCloseCart}/>
              </CSSTransition>
    } else if (arr.length === 0) {
      return <CSSTransition timeout={500} classNames="cart__empty">
                <EmptyCart onClose={onCloseCart}/>
              </CSSTransition>
    } else {
      return arr.map(item => {
        return <CSSTransition key={item.id} timeout={500} classNames="sidebar__offerList__item"> 
                  <CartItem key={item.id} id={item.id} src={item.src} price={item.price} title={item.title}/> 
                </CSSTransition>
      })
    } 
  }

  const elements = renderCartItems(sneakers);

  return (
      <CSSTransition 
        in={isCartOpen}
        nodeRef={nodeRef}
        timeout={500}
        classNames="sidebar"
        mountOnEnter
        unmountOnExit>
        <div className="sidebar" ref={nodeRef}>
          <div className="sidebar__inner">
            <div className="sidebar__header">
              <h2>Корзина</h2>
              <button className="deleteSneakers" onClick={onCloseCart}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="white" stroke="#F2F2F2"/>
                <path d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z" fill="#B5B5B5"/>
                </svg>
              </button>
            </div>
            <div className="sidebar__offerList">
              <TransitionGroup>
                {elements}
              </TransitionGroup>
            </div>
            <div className="sideber__offer__footer" style={IsOffer ? {"display": "none"} : null}>
              <div className="offer__price">
                  <span>Итого:</span>
                  <div className="dottedBorder"></div>
                  <span><b>{totalPrice} грн.</b></span>
              </div>
              <div className="offer__price">
                  <span>Налог:</span>
                  <div className="dottedBorder"></div>
                  <span><b>{Math.floor(totalPrice * 0.01)} грн.</b></span>
              </div>
              <button className="btn__offer" onClick={orderPurchase}>
                  <span>Оформить заказ</span>
                  <img src="/resources/img/offer-right.svg" alt="arrow" />
              </button>
            </div>    
          </div>
        </div>
      </CSSTransition>
  )
}

const EmptyCart = ({onClose}) => {
  return (
    <div className="cart__empty">
      <img width={120} height={120} src="/resources/img/box.jpg" alt="" />
      <h2>Корзина пустая</h2>
      <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
      <button className="btn__offer" onClick={onClose}>
          <span>Вернуться назад</span>
          <img src="/resources/img/offer-right.svg" alt="arrow" />
      </button>
    </div>
  )
}

const ActiveOfferCart = ({onClose}) => {
  return (
    <div className="cart__offer">
      <img width={120} height={120} src="/resources/img/offer.png" alt="offer" />
      <h2>Заказ оформлен!</h2>
      <p>Ваш заказ #18 скоро будет передан курьерской доставке</p>
      <button className="btn__offer" onClick={onClose}>
          <span>Вернуться назад</span>
          <img src="/resources/img/offer-right.svg" alt="arrow" />
      </button>
    </div>
  )
}

export default Cart;