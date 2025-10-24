import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPrice, getHotel } from '../api/api';
import Loader from '../components/Loader';
import Error from '../components/Error';
import TourCard from '../components/TourCard/TourCard';

const TourPage = () => {
  const { tourId } = useParams();
  const [tour, setTour] = useState(null);
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');

      try {
        const priceRes = await getPrice(tourId);
        const tourData = await priceRes.json();

        const hotelRes = await getHotel(tourData.hotelID);
        const hotelData = await hotelRes.json();

        setTour(tourData);
        setHotel(hotelData);
      } catch (err) {
        setError('Помилка завантаження даних туру');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tourId]);

  if (loading) return <Loader />;
  if (error) return <Error message={error} />;
  if (!tour || !hotel) return <p>Дані недоступні</p>;

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '25px' }}>
      {/* Используем TourCard */}
      <TourCard tour={tour} hotel={hotel} />
    </div>
  );
};

export default TourPage;
