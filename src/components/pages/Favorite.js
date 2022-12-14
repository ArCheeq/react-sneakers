import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Helmet } from "react-helmet";

import { useEffect } from "react";
import { fetchSneakers } from "../store/slices/sneakersSlice";
import { fetchCart, countTotalPrice } from "../store/slices/cartSlice";

import SneakersItem from "../sneakersItem/SneakersItem";
import Skeleton from "../skeleton/Skeleton";

import { nanoid } from 'nanoid';

import leftArrow from "../../resources/img/goMainPage.png";
import emptyFavorite from "../../resources/img/EmptyFavorite.png";
import arrow from "../../resources/img/offer-right.svg";

const Favorite = () => {

    const dispatch = useDispatch();
    const {sneakers, sneakersLoadingStatus} = useSelector(state => state.sneakers);

    useEffect(() => {
        dispatch(fetchSneakers());
        dispatch(fetchCart());
        dispatch(countTotalPrice());
        // eslint-disable-next-line
    }, []);

    const renderSneakersList = (arr) => {

        if (sneakersLoadingStatus === 'loading') {
            // return [...new Array(6)].map(() => <Skeleton id={nanoid()} /> )
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

    return (
        <main className='main'>
            <Helmet>
                <meta
                    name="description"
                    content="Sneakers Online Shop - Favorite Page"/>
                <title>Favorite Sneakers</title>
            </Helmet>
            <div className="main__header main__header-favorite">
                <Link to="/">
                    <img src={leftArrow} alt="Left Arrow" />
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
                    <img className="emptyFavoriteImg" width={70} height={70} src={emptyFavorite} alt="Empty Favorite" />
                    <div className="emptyFavoriteDescr">
                        <h2>Закладок нет :(</h2>
                        <p>Вы ничего не добавили в закладки</p>
                        <Link to="/" className="btn__offer">
                            <span>Вернуться назад</span>
                            <img src={arrow} alt="arrow" />
                        </Link>   
                    </div>
                </div>
            </div>
        </CSSTransition>
    )
}