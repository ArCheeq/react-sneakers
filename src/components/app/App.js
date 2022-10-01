import Header from '../header/Header';
import Home from '../pages/Home';

import '../../style.scss';

function App() {
  return (
    <div className="app">
      <div className="wrapper">
        <Header/>
        <Home />
      </div>
    </div>
  );
}

export default App;