import Header from '../header/Header';
import Home from '../pages/Home';
import Cart from '../cart/Cart';

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
        <Home />
      </div>
    </div>
  );
}

export default App;