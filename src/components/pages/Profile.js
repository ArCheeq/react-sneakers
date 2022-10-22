import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useHttp } from "../hooks/useHttp";
import SneakersItem from "../sneakersItem/SneakersItem";

import { useState } from "react";

import { nanoid } from "@reduxjs/toolkit";

const Profile = () => {

    const {request} = useHttp();
    const [sneakers, setSneakers] = useState([]);

    useEffect(() => {
        request("http://localhost:3001/offerList", "GET")
            .then(data => setSneakers(data));
    }, []);

    const renderElements = (arr) => {
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
            <div className="main__header main__header-profile">
                <Link to="/">
                    <img src="/resources/img/goMainPage.png" alt="Left Arrow" />
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
