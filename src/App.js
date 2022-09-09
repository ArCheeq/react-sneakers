import {useState, useEffect} from 'react'

import axios from 'axios';

import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import SneakersItem from './components/sneakersItem/SneakersItem';

import './style.scss';

function App() {
  const [cartOpen, setCartOpened] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [sneakers, setSneakers] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    axios.get('https://63136394b466aa9b03988e97.mockapi.io/sneakers').then(res => setSneakers(res.data));
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
  }, [cartOpen])

  return (
    <div className="App">
      <div className="wrapper">
        <Header onClickCart={() => setCartOpened(true)}/>
        {cartOpen ? <Sidebar onClickCart={() => setCartOpened(false)} cartItems={cartItems}/> : null}
        <main className='main'>
          <div className="main__header">
            <h1 className='title'>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
            <div className="seach-block">
              <img src="/resources/img/search.svg" alt="search" />
              <input type="text" placeholder='Поиск...' onChange={(e) => setSearchValue(e.target.value)} value={searchValue}/>
            </div>
          </div>
          <div className="sneakers">
            {
              sneakers.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item, i) => (
              <SneakersItem 
                src={item.src} 
                price={item.price} 
                title={item.title} 
                key={i}/>))
            }
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;