import React from 'react';
import { formatDate, formatPrice } from '../../utils/format';
import './TourCard.css';
import { Link } from 'react-router-dom';

const TourCard = ({ tour, hotel }) => {
  return (
    <div className="tour-card">
      <img src={hotel.img} alt={hotel.name} />
      <h3>{hotel.name}</h3>
      <p>{hotel.cityName}, {hotel.countryName}</p>
      <p>{formatDate(tour.startDate)} - {formatDate(tour.endDate)}</p>
      <p>{formatPrice(tour.amount, 'грн')}</p>
      <Link to={`/tour/${tour.id}/${hotel.id}`}>Відкрити ціну</Link>
    </div>
  );
};

export default TourCard;
