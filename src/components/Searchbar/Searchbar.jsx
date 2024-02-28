import { Component } from 'react';

import icon from '../../images/icons/magnifying-glass.svg';

import s from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { onSubmit } = this.props;
    const { query } = this.state;
    onSubmit(query);
    //   reset();
  };

  render() {
    const { handleSubmit, handleChange } = this;
    const { query } = this.state;

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
  }
}

export default Searchbar;
