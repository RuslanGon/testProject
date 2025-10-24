import React from 'react';
import { Link } from 'react-router-dom';

// Форматирование даты
const formatDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString('uk-UA');
};

// Форматирование цены
const formatPrice = (amount, currency) => {
  return amount.toLocaleString('uk-UA', { style: 'currency', currency });
};

const TourCard = ({ tour, hotel }) => {
  if (!tour || !hotel) return null;

  return (
    <div style={{
      width: '300px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      margin: '10px',
      padding: '15px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Ссылка на страницу тура */}
      <Link to={`/tour/${tour.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img
          src={hotel.img}
          alt={hotel.name}
          style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '6px', marginBottom: '10px' }}
        />
        <h3>{hotel.name}</h3>
        <p>{hotel.countryName}, {hotel.cityName}</p>
      </Link>

      <p>Дати: {formatDate(tour.startDate)} - {formatDate(tour.endDate)}</p>
      <p>Ціна: {formatPrice(tour.amount, tour.currency)}</p>

      <Link to={`/tour/${tour.id}`} style={{
        display: 'inline-block',
        marginTop: '10px',
        padding: '8px 12px',
        backgroundColor: '#007bff',
        color: '#fff',
        borderRadius: '4px',
        textDecoration: 'none',
        textAlign: 'center'
      }}>
        Відкрити ціну
      </Link>
    </div>
  );
};

export default TourCard;
