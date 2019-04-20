import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import instance from './api';
import { updateMusics } from './redux/actions';

import Header from './components/Header';
import Statistics from './components/Statistics';
import ChartCard from './components/ChartCard';
import Loading from './components/Loading';

export class Main extends Component {
  componentDidMount() {
    this.fetchMusics('todos');
  }

  fetchMusics(genre) {
    instance
      .get(genre)
      .then(response => {
        updateMusics(response.data)
      })
  }

  render() {
    const {
      musics
    } = this.props;
    return (
      <main className='content'>
        <Header title='Bossa' />
        <Statistics />
        <main className='content__cards'>
          {
            musics.length > 0 ?
            musics.map(music => {
              return (
                <ChartCard key={music.id} chartData={music} />
              );
            }) :
            <Loading />
          }
        </main>
      </main>
    )
  }
}

const mapStateToProps = (state) => ({
  musics: state.musics,
  genre: state.selectedGenre
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
