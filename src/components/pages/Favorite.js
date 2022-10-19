import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import SneakersItem from "../sneakersItem/SneakersItem";
import Skeleton from "../skeleton/Skeleton";

import { nanoid } from 'nanoid';

const Favorite = () => {

    const {sneakers, sneakersLoadingStatus} = useSelector(state => state.sneakers);

    const renderSneakersList = (arr) => {

        if (sneakersLoadingStatus === 'loading') {
            // return Array(12).fill( <Skeleton/> ) Баг с Transition Group не обновляется значение elements внутри компонента
        } else if (sneakersLoadingStatus === 'error') {
            return <h2 className="error">Произошла ошибка, повторите позже...</h2>
        }
    
        return arr.map(item => {
            return  (
                <CSSTransition key={item.id} timeout={500} classNames="sneakers__item">
                    <SneakersItem key={item.id} id={item.id} src={item.src} price={item.price} title={item.title} cart={item.cart} favorite={item.favorite}/>
                </CSSTransition>
            )
        })
    }

    const elements = renderSneakersList(sneakers.filter((item) => item.favorite));

    console.log(elements);

    return (
        <main className='main'>
            <div className="favorite__header">
                <Link to="/">
                    <img src="/resources/img/goMainPage.png" alt="Left Arrow" />
                </Link>
                <h1 className='title'>Мои закладки</h1>
            </div>
            
            <TransitionGroup className="sneakersFavorite">
                {elements.length ? elements : <EmptyFavorite /> }
            </TransitionGroup>
        </main>
    )
}

export default Favorite;

const EmptyFavorite = () => {
    return (
        <CSSTransition timeout={500} classNames="emptyFavorite">
            <div className="emptyFavorite">
                <div className="emptyFavorite__inner">
                    <img className="emptyFavoriteImg" width={70} height={70} src="/resources/img/EmptyFavorite.png" alt="Empty Favorite" />
                    <div className="emptyFavoriteDescr">
                        <h2>Закладок нет :(</h2>
                        <p>Вы ничего не добавили в закладки</p>
                        <button className="btn__offer">
                            <span>Вернуться назад</span>
                            <img src="/resources/img/offer-right.svg" alt="arrow" />
                        </button>   
                    </div>
                </div>
            </div>
        </CSSTransition>
    )
}