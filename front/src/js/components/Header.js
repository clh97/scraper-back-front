import React, { Component } from 'react'
import { connect } from 'react-redux'
import instance from '../api';
import { clearMusics, updateGenres, updateMusics } from '../redux/actions';

import Select from './Select';

export class Header extends Component {

  componentDidMount() {
    this.fetchGenres();
  }

  fetchGenres() {
    instance
      .get('/generos')
      .then(response => {
        updateGenres(response.data)
      })
  }

  fetchMusics(genre) {
    clearMusics();
    instance
      .get(genre)
      .then(response => {
        updateMusics(response.data)
      })
  }

  onSelectChange = (e) => {
    const nextGenre = e.target.value;
    this.fetchMusics(nextGenre)
  }

  render() {
    const {
      title,
      genres
    } = this.props;

    return (
      <header>
        <h1 className='header__title'>{title}</h1>
        <div className="header__options">
          <Select onSelectChange={this.onSelectChange} labelText='Selecione um gênero:' options={genres} />
        </div>
      </header>
    )
  }
}

const mapStateToProps = (state) => ({
  genres: state.genres
})

export default connect(mapStateToProps, null)(Header)