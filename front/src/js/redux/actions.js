import store from './store';

const UPDATE_MUSICS = 'UPDATE_MUSICS';
const UPDATE_GENRES = 'UPDATE_GENRES';
const CHANGE_GENRE = 'CHANGE_GENRE';
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

export const changeGenre = (genre) => {
  store.dispatch({
    type: CHANGE_GENRE,
    payload: {
      genre
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
  CHANGE_GENRE,
  CLEAR_MUSICS
}