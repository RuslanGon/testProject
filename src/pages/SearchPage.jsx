import React, { useState } from 'react';
import SearchForm from '../components/SearchForm/SearchForm';
import TourCard from '../components/TourCard/TourCard';
import Loader from '../components/Loader';
import Error from '../components/Error';
import EmptyState from '../components/EmptyState';
import { startSearchPrices, getSearchPrices, getHotels } from '../api/api';

const SearchPage = () => {
  const [tours, setTours] = useState([]);
  const [hotelsMap, setHotelsMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (countryId) => {
    setLoading(true);
    setError('');
    setTours([]);
    setHotelsMap({});

    try {
      const res = await startSearchPrices(countryId);
      const { token } = await res.json();

      const fetchPrices = async (token, retries = 2) => {
        try {
          const pricesRes = await getSearchPrices(token);
          const pricesData = (await pricesRes.json()).prices;

          const hotelsRes = await getHotels(countryId);
          const hotelsData = await hotelsRes.json();

          setHotelsMap(hotelsData);
          setTours(Object.values(pricesData));
        } catch (err) {
          if (err.status === 425) {
            const data = await err.json();
            const waitTime = new Date(data.waitUntil) - Date.now();
            await new Promise(r => setTimeout(r, waitTime > 0 ? waitTime : 1000));
            await fetchPrices(token, retries);
          } else if (retries > 0) {
            await fetchPrices(token, retries - 1);
          } else {
            setError('Помилка пошуку турів');
          }
        }
      };

      await fetchPrices(token);
    } catch (err) {
      setError('Помилка пошуку турів');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Пошук турів</h1>
      <SearchForm onSearch={handleSearch} />

      {loading && <Loader />}
      {error && <Error message={error} />}
      {!loading && !error && tours.length === 0 && <EmptyState />}

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: '700px',
        margin: '0 auto',
        padding: '25px',
        boxSizing: 'border-box'
      }}>
        {tours.map(tour => {
          const hotel = hotelsMap[tour.hotelID];
          if (!hotel) return null;
          return <TourCard key={tour.id} tour={tour} hotel={hotel} />;
        })}
      </div>
    </div>
  );
};

export default SearchPage;
