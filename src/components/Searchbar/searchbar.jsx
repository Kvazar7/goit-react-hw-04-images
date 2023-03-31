import PropTypes from 'prop-types';
import { useState } from 'react'
import css from '../Searchbar/searchbar.module.css'

export default function Search ({ handleSerch }) {
  const [value, setValue] = useState('');
  
  const handleChange = ({ target: { value } }) => {
    setValue( value )
	}

  const handleSubmit = (event) => {
    event.preventDefault()
    handleSerch(value)
  }

  
    return (
      <header className={css.Searchbar}>
        <form
            className={css.SearchForm}
            onSubmit={handleSubmit}>
          
          <button type="submit" className={css.SearchForm_button}>
            <span className={css.SearchForm_button_label}>Search</span>
          </button>

          <input
            className={css.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
            value={value}
          />
        </form>
      </header>
    )
  
}

Search.propTypes = {
  handleSerch: PropTypes.func,
}