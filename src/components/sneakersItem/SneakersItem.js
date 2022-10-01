import './sneakersItem.scss';

const SneakersItem = ({src, price, title}) => {
    return (
        <div className="sneakers__item">
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
            <button className="toCartBtn">
                <img width={32} height={32} src={"/resources/img/addBtn.svg"} alt="button" />
            </button>
            </div>
        </div>
    )
}

export default SneakersItem;