import Header from '../header/Header';
import Home from '../pages/Home';
import Favorite from '../pages/Favorite';
import Cart from '../cart/Cart';

import { Routes, Route } from 'react-router-dom';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import '../../style.scss';

function App() {
  const {isCartOpen} = useSelector(state => state.cart);

  useEffect(() => {
    document.body.classList.toggle('scroll-hidden');
  }, [isCartOpen])


  return (
    <div className="app">
      <div className="wrapper">
        <Cart/> 
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/favorites' element={<Favorite/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;