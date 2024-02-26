import React from 'react';
import DishList from './DishList';
const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="restaurant-card">
        {console.log(restaurant.image)}
      <img src={restaurant.image} alt={restaurant.name} />
      <h2>{restaurant.name}</h2>
      <p>{restaurant.cuisine}</p>

      {/* <p>{restaurant.rating}</p> */}
      <p>{restaurant.address}</p>
      <DishList dishes={restaurant.dishes} />
      <div className="rating-banner">{restaurant.rating}</div>

    </div>
  );
};

export default RestaurantCard;
