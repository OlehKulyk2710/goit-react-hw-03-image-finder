import { Component } from 'react';
import PropTypes from 'prop-types';
import { GoSearch } from 'react-icons/go';
import {
  SearchBar,
  SearchForm,
  SearchBtn,
  SearchInput,
} from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    searchValue: '',
  };

  handleChange = event => {
    const searchValue = event.currentTarget.value;
    this.setState({ searchValue });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { onSubmit } = this.props;
    const { searchValue } = this.state;

    const query = searchValue.trim();
    if (!query) return;

    onSubmit(query);
    // this.setState({ searchValue: '' });
  };

  render() {
    const { searchValue } = this.state;

    return (
      <SearchBar>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchBtn type="submit">
            <GoSearch fontSize="18px" />
          </SearchBtn>

          <SearchInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchValue}
            onChange={this.handleChange}
          />
        </SearchForm>
      </SearchBar>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
