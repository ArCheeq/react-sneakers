import Header from '../header/Header';
import Home from '../pages/Home';
import Cart from '../cart/Cart';

import { useSelector } from 'react-redux';

import '../../style.scss';

function App() {
  const {isCartOpen} = useSelector(state => state.cart);

  return (
    <div className="app">
      <div className="wrapper">
        {isCartOpen ? <Cart/> : null}
        <Header/>
        <Home />
      </div>
    </div>
  );
}

export default App;