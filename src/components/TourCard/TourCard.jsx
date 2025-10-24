import React from 'react';

// Форматирование даты
const formatDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString('uk-UA');
};

// Форматирование цены
const formatPrice = (amount, currency) => {
  return amount.toLocaleString('uk-UA', { style: 'currency', currency });
};

const TourCard = ({ tour, hotel, full = false }) => {
  if (!tour || !hotel) return null;

  return (
    <div style={{
      width: full ? '100%' : '300px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      margin: '10px',
      padding: '15px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <img
        src={hotel.img || 'https://dummyimage.com/300x180/ccc/000&text=No+Image'}
        alt={hotel.name || 'Назва готелю недоступна'}
        style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '6px', marginBottom: '10px' }}
      />
      <h3>{hotel.name || 'Назва готелю недоступна'}</h3>
      <p>{hotel.countryName || 'Країна невідома'}, {hotel.cityName || 'Місто невідомо'}</p>

      <p>Дати: {formatDate(tour.startDate)} - {formatDate(tour.endDate)}</p>
      <p>Ціна: {formatPrice(tour.amount, tour.currency)}</p>

      {!full && (
        <a
          href={`/tour/${tour.id}`}
          style={{
            display: 'inline-block',
            marginTop: '10px',
            padding: '8px 12px',
            backgroundColor: '#007bff',
            color: '#fff',
            borderRadius: '4px',
            textDecoration: 'none',
            textAlign: 'center'
          }}
        >
          Відкрити ціну
        </a>
      )}
    </div>
  );
};

export default TourCard;
