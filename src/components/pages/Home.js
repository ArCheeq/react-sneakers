import SneakersItem from "../sneakersItem/SneakersItem";

const Home = ({searchValue, setSearchValue, sneakers, onAddToCart, onAddToFavorite}) => {
    return (
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
                onAddToCart={onAddToCart}
                onAddToFavorite={onAddToFavorite}
                key={i}/>))
            }
          </div>
        </main>
    )
}

export default Home;