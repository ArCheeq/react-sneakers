import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useHttp } from "../hooks/useHttp";
import SneakersItem from "../sneakersItem/SneakersItem";
import { CSSTransition } from "react-transition-group";
import { Helmet } from "react-helmet";

import { useState } from "react";

import { nanoid } from "@reduxjs/toolkit";

import leftArrow from "../../resources/img/goMainPage.png";
import emptyProfile from "../../resources/img/EmptyProfile.png";
import arrow from "../../resources/img/offer-right.svg";

const Profile = () => {

    const {request} = useHttp();
    const [sneakers, setSneakers] = useState([]);

    useEffect(() => {
        request("http://localhost:3001/offerList", "GET")
            .then(data => setSneakers(data));
    }, []);

    const renderElements = (arr) => {
        if (arr.length === 0) {
            return <EmptyProfile />
        }

        return arr.map((element, index) => {
            return (
                <div className="order" key={nanoid()}>
                    <h3 className="order__title">Заказ №{index + 1}</h3>
                    <div className="order__list">
                        {element.map(item => {
                            return <SneakersItem key={item.id} id={item.id} src={item.src} price={item.price} title={item.title} cart={item.cart} favorite={item.favorite} profile={true}/>
                        })}
                    </div>
                </div>
            )
        })
    }

    const elements = renderElements(sneakers);

    return (
        <main className='main'>
            <Helmet>
                <meta
                    name="description"
                    content="Sneakers Online Shop - Profile Page"/>
                <title>Profile</title>
            </Helmet>
            <div className="main__header main__header-profile">
                <Link to="/">
                    <img src={leftArrow} alt="Left Arrow" />
                </Link>
                <h1 className='title'>Мои покупки</h1>
            </div>
            <div className="profile">
                {elements}
            </div>
        </main>
    )
}

export default Profile;

const EmptyProfile = () => {
    return (
        <CSSTransition timeout={500} classNames="emptyFavorite">
            <div className="emptyFavorite">
                <div className="emptyFavorite__inner">
                    <img className="emptyFavoriteImg" width={70} height={70} src={emptyProfile} alt="Empty Favorite" />
                    <div className="emptyFavoriteDescr">
                        <h2>У вас нет заказов</h2>
                        <p>Оформите хотя бы один заказ</p>
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