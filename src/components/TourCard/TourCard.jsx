import React from 'react';
import { Link } from 'react-router-dom';

const formatDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString('uk-UA');
};

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
      <Link to={`/tour/${tour.id}/${hotel.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img
          src={hotel.img || 'https://via.placeholder.com/300x180?text=No+Image'}
          alt={hotel.name || 'Готель'}
          style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '6px', marginBottom: '10px' }}
        />
        <h3>{hotel.name || 'Назва готелю недоступна'}</h3>
        <p>{hotel.countryName || 'Країна невідома'}, {hotel.cityName || 'Місто невідомо'}</p>
      </Link>

      <p>Дати: {formatDate(tour.startDate)} - {formatDate(tour.endDate)}</p>
      <p>Ціна: {formatPrice(tour.amount, tour.currency)}</p>

      <Link to={`/tour/${tour.id}/${hotel.id}`} style={{
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
