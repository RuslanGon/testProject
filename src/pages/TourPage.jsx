import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPrice, getHotel } from '../api/api';
import Loader from '../components/Loader';
import Error from '../components/Error';
import TourCard from '../components/TourCard/TourCard';

const TourPage = () => {
  const { priceId, hotelId } = useParams();
  const navigate = useNavigate(); 
  const [tour, setTour] = useState(null);
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');

      try {
        const priceRes = await getPrice(priceId);
        const tourData = await priceRes.json();

        const hotelRes = await getHotel(parseInt(hotelId));
        const hotelData = await hotelRes.json();

        setTour(tourData);
        setHotel(hotelData);

        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (err) {
        setError('Помилка завантаження даних туру');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [priceId, hotelId]);

  const handleBack = () => {
    navigate(-1); 
  };

  if (loading) return <Loader />;
  if (error) return <Error message={error} />;
  if (!tour || !hotel) return <p>Дані недоступні</p>;

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '25px' }}>
      <button
        onClick={handleBack}
        style={{
          marginBottom: '20px',
          padding: '8px 12px',
          border: 'none',
          borderRadius: '4px',
          backgroundColor: '#ddd',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        ← Назад
      </button>
      <TourCard tour={tour} hotel={hotel} />
    </div>
  );
};

export default TourPage;
