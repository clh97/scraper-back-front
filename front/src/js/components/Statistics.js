import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

import Loading from './Loading';

export class Statistics extends Component {

  state = {
    mostUsed: null,
    loading: true
  }

  async componentWillReceiveProps(nextProps) {
    const { musics } = nextProps;
    if(musics.length <= 0) {
      this.setState({ loading: true })
      return;
    }
    
    const mostUsed = await this.calculateMostUsedChord(musics, 4);
    const fourMostUsed = mostUsed.map(i => i.chord).join(', ');
    this.setState({ mostUsed, fourMostUsed, loading: false });
  }

  calculateMostUsedChord = (musics, n) => new Promise((resolve, reject) => {
    const allChordsArray =
      musics
        .map(m => m.chords)
    const allChords = [].concat.apply([], allChordsArray);

    const result =
      _.chain(allChords)
        .countBy()
        .pairs()
        .sortBy(i => i[1])
        .reverse()
        .first(n)
        .map(r => { return { chord: r[0], quantity: r[1] } })
        .value();
    resolve(result);
  })

  render() {
    const {
      mostUsed,
      fourMostUsed,
      loading
    } = this.state;

    return (
      <div className='header__statistics'>
        {
          loading ?
          <Loading /> :
          <MostUsed mostUsed={mostUsed} fourMostUsed={fourMostUsed} />
        }
      </div>
    );
  }
}

const MostUsed = props => (
  <React.Fragment>
    <h3>Most used chord: {props.mostUsed[0].chord}</h3>
    <h3>Four most used: {props.fourMostUsed}</h3>
  </React.Fragment>
)

const mapStateToProps = (state) => ({
  musics: state.musics
})

export default connect(mapStateToProps, null)(Statistics)