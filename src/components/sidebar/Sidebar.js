import './sidebar.scss';

const Sidebar = ({onClickCart, cartItems}) => {

    const closeCartMenu = (target) => {
      if (target.classList.contains('sidebar')) {
        onClickCart();
      }
    }

    return (
        <div className="sidebar" onClick={(e) => closeCartMenu(e.target)}>
          <div className="sidebar__inner">
            <div className="sidebar__header">
              <h2>Корзина</h2>
              <button className="deleteSneakers" onClick={onClickCart}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="white" stroke="#F2F2F2"/>
                <path d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z" fill="#B5B5B5"/>
                </svg>
              </button>
            </div>
            {
              cartItems.length > 0 ? <>
                                      <div className="sidebar__offerList">
                                        {cartItems.map((item, i) => (
                                          <div className="sidebar__offerList__item" key={i}>
                                            <img width={70} height={70} src={item.src} alt={item.title} className="sneakers__offer__img" />
                                            <div className="sidebar__offerList__item__info">
                                              <p className="sneakersName">
                                                {item.title}
                                              </p>
                                              <p className="sneakers__price">
                                                {item.price} грн.
                                              </p>
                                            </div>
                                            <button className="deleteSneakers">
                                              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="white" stroke="#F2F2F2"/>
                                              <path d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z" fill="#B5B5B5"/>
                                              </svg>
                                            </button>
                                          </div>
                                        ))}
                                      </div>
                                      <div className="sideber__offer__footer">
                                        <div className="offer__price">
                                            <span>Итого:</span>
                                            <div className="dottedBorder"></div>
                                            <span><b>21 498 грн.</b></span>
                                        </div>
                                        <div className="offer__price">
                                            <span>Налог:</span>
                                            <div className="dottedBorder"></div>
                                            <span><b>1074 грн.</b></span>
                                        </div>
                                        <button className="btn__offer">
                                            <span>Оформить заказ</span>
                                            <img src="/resources/img/offer-right.svg" alt="arrow" />
                                        </button>
                                      </div>
                                    </> : <EmptyCart onClickCart={onClickCart} />
            }
          </div>
        </div>
    )
}

const EmptyCart = ({onClickCart}) => {
  return (
    <div className="cart__empty">
      <img width={120} height={120} src="/resources/img/box.jpg" alt="" />
      <h2>Корзина пустая</h2>
      <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
      <button className="btn__offer" onClick={onClickCart}>
          <span>Вернуться назад</span>
          <img src="/resources/img/offer-right.svg" alt="arrow" />
      </button>
    </div>
  )
}

export default Sidebar;