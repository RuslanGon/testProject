import React, { useState, useEffect, useRef } from 'react';
import { getCountries, searchGeo } from '../../api/api';
import './SearchForm.css';

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [dropdown, setDropdown] = useState([]);
  const [selected, setSelected] = useState(null);
  const ref = useRef();

  useEffect(() => {
    getCountries().then(res => res.json()).then(data => {
      setDropdown(Object.values(data).map(c => ({ ...c, type: 'country' })));
    });
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      searchGeo(query).then(res => res.json()).then(data => {
        setDropdown(Object.values(data));
      });
    }
  }, [query]);

  const handleSelect = (item) => {
    setSelected(item);
    setQuery(item.name);
    setDropdown([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selected) {
      onSearch(selected.id);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        placeholder="Введіть країну, місто або готель"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => {
          if (!query) {
            getCountries().then(res => res.json()).then(data => {
              setDropdown(Object.values(data).map(c => ({ ...c, type: 'country' })));
            });
          }
        }}
      />
      <button type="submit">Знайти</button>
      <ul className="dropdown">
        {dropdown.map(item => (
          <li key={item.id} onClick={() => handleSelect(item)}>
            {item.type === 'country' && '🌍 '}
            {item.type === 'city' && '🏙️ '}
            {item.type === 'hotel' && '🏨 '}
            {item.name}
          </li>
        ))}
      </ul>
    </form>
  );
};

export default SearchForm;

