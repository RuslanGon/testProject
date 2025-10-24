import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import TourPage from './pages/TourPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/tour/:priceId/:hotelId" element={<TourPage />} />
      </Routes>
    </Router>
  );
};

export default App;
