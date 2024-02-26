import React from 'react';

const DishList = ({ dishes }) => {
  return (
    <ul className="dish-list">
      {dishes.map((dish) => (
        <li key={dish.id}>
          {dish.name} - ${dish.price} (x {dish.quantity})
        </li>
      ))}
    </ul>
  );
};

export default DishList;
