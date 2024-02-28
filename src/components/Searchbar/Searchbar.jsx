import { useState } from 'react';

import icon from '../../images/icons/magnifying-glass.svg';

import s from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');
  const [previousQuery, setPreviousQuery] = useState('');

  const handleChange = e => {
    const { value } = e.target;
    setQuery(value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (previousQuery === query) {
      alert('try')
      return
    }

    onSubmit(query);
    setPreviousQuery(query);
  };

  return (
    <div className={s.searchbar}>
      <form onSubmit={handleSubmit} className={s.form}>
        <input
          className={s.input}
          onChange={handleChange}
          type="text"
          name="query"
          value={query}
          placeholder="Search images and photos"
          autoComplete="off"
          autoFocus
        />
        <button className={s.button} type="submit">
          <img src={icon} alt="icon" />
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
