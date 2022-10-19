import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SneakersItem from "../sneakersItem/SneakersItem";
import { fetchSneakers, changeSearchValue } from "../store/slices/sneakersSlice";
import { fetchCart } from "../store/slices/cartSlice";
import Skeleton from "../skeleton/Skeleton";

import { nanoid } from 'nanoid'

const Home = () => {

  const dispatch = useDispatch();
  const {sneakers, sneakersLoadingStatus, searchValue} = useSelector(state => state.sneakers);

  //Фильтрация кроссовок по input
  const filteredSneakers = sneakers.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()));

  useEffect(() => {
    dispatch(fetchSneakers());
    dispatch(fetchCart());
    // eslint-disable-next-line
  }, []);

  const onChangeSearchValue = (value) => {
    dispatch(changeSearchValue(value));
  }

  const renderSneakersList = (arr) => {

    if (sneakersLoadingStatus === 'loading') {
      return Array(12).fill( <Skeleton/> ).map(item => {
        return <Skeleton key={nanoid()}/>
      })
    } else if (sneakersLoadingStatus === 'error') {
      return <h2>Произошла ошибка, повторите позже</h2>
    }

    return arr.map(item => {
      return <SneakersItem key={item.id} id={item.id} src={item.src} price={item.price} title={item.title} cart={item.cart} favorite={item.favorite}/>
    })
  }

  const elements = renderSneakersList(filteredSneakers);

    return (
        <main className='main'>
          <div className="main__header">
            <h1 className='title'>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
            <div className="seach-block">
              <img src="/resources/img/search.svg" alt="search" />
              <input type="text" placeholder='Поиск...' onChange={(e) => onChangeSearchValue(e.target.value)} value={searchValue}/>
            </div>
          </div>
          <div className="sneakers">
              {elements}
          </div>
        </main>
    )
}

export default Home;