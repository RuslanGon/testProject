import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPrice, getHotel } from '../api/api';
import { formatDate, formatPrice } from '../utils/format';

const TourPage = () => {
  const { priceId, hotelId } = useParams();
  const [price, setPrice] = useState(null);
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    getPrice(priceId).then(res => res.json()).then(setPrice);
    getHotel(hotelId).then(res => res.json()).then(setHotel);
  }, [priceId, hotelId]);

  if (!price || !hotel) return <div>Завантаження...</div>;

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <h1>{hotel.name}</h1>
      <p>{hotel.cityName}, {hotel.countryName}</p>
      <img src={hotel.img} alt={hotel.name} style={{ width: '100%' }} />
      <p>{hotel.description}</p>
      <h2>Сервіси:</h2>
      <ul>
        {Object.entries(hotel.services).map(([k, v]) => (
          <li key={k}>{k}: {v}</li>
        ))}
      </ul>
      <h2>Деталі туру:</h2>
      <p>{formatDate(price.startDate)} - {formatDate(price.endDate)}</p>
      <p>Ціна: {formatPrice(price.amount)}</p>
    </div>
  );
};

export default TourPage;
