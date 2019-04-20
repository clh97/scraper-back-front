import store from './store';

const UPDATE_MUSICS = 'UPDATE_MUSICS';
const UPDATE_GENRES = 'UPDATE_GENRES';
const CLEAR_MUSICS = 'CLEAR_MUSICS';

export const updateMusics = (musics) => {
  store.dispatch({
    type: UPDATE_MUSICS,
    payload: {
      musics
    }
  })
}

export const updateGenres = (genres) => {
  store.dispatch({
    type: UPDATE_GENRES,
    payload: {
      genres
    }
  })
}

export const clearMusics = (genre) => {
  store.dispatch({
    type: CLEAR_MUSICS
  })
}


export {
  UPDATE_MUSICS,
  UPDATE_GENRES,
  CLEAR_MUSICS
}