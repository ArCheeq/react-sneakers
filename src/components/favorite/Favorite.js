import SneakersItem from "../sneakersItem/SneakersItem"

const Favorite = ({ items, onAddToFavorite }) => {
    return (
        <div className="main">
            <h1 className='title'>Мои закладки</h1>

            <div className="sneakers">
                {
                    items.map((item, index) => (
                        <SneakersItem key={index} title={item.title} price={item.price} src={item.src} id={item.id} favorite={true} onAddToFavorite={onAddToFavorite}/>
                    ))
                }
            </div>
        </div>
    )
}

export default Favorite;