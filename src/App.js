import {useState, useEffect} from 'react'

import axios from 'axios';

import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Favorite from './components/favorite/Favorite';
import Home from './components/pages/Home';

import { Route, Routes } from 'react-router-dom';

import './style.scss';

function App() {
  const [cartOpen, setCartOpened] = useState(false);

  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [sneakers, setSneakers] = useState([]);

  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    axios.get('https://63136394b466aa9b03988e97.mockapi.io/sneakers').then(res => setSneakers(res.data));
    axios.get('https://63136394b466aa9b03988e97.mockapi.io/cart').then(res => setCartItems(res.data));
    axios.get('https://63136394b466aa9b03988e97.mockapi.io/favorite').then(res => setFavoriteItems(res.data));
  }, []);

  const setOverflow = () => {
    if (cartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  useEffect(() => {
    setOverflow();
  }, [cartOpen]);

  const onAddToCart = async (obj) => {
    const { data } = await axios.post('https://63136394b466aa9b03988e97.mockapi.io/cart', obj);
    setCartItems((prev) => [...prev, data]);
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://63136394b466aa9b03988e97.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter(item => item.id != id ));
  }

  const onAddToFavorite = async (obj) => {
    console.log(obj);
    if (favoriteItems.find(item => item.id == obj.id)) {
      axios.delete(`https://63136394b466aa9b03988e97.mockapi.io/favorite/${obj.id}`);
      setFavoriteItems((prev) => prev.filter(item => item.id != obj.id ));
    } else {
      const { data } = await axios.post('https://63136394b466aa9b03988e97.mockapi.io/favorite', obj);
      setFavoriteItems((prev) => [...prev, data]);
    }
  }

  return (
    <div className="App">
      <div className="wrapper">
        <Header onClickCart={() => setCartOpened(true)}/>
        {cartOpen ? <Sidebar onClickCart={() => setCartOpened(false)} cartItems={cartItems} onRemove={onRemoveItem}/> : null}

        <Routes>
            <Route path="/" element={
              <Home 
                searchValue={searchValue} 
                setSearchValue={setSearchValue} 
                sneakers={sneakers} 
                onAddToCart={onAddToCart} 
                onAddToFavorite={onAddToFavorite}/>}/>
            <Route path="/favorites" element={<Favorite items={favoriteItems} onAddToFavorite={onAddToFavorite}/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;