import { UPDATE_MUSICS, UPDATE_GENRES, CHANGE_GENRE, CLEAR_MUSICS } from './actions';

const initialState = {
  selectedGenre: 'Todos',
  musics: [],
  genres: []
}

export function musics(state = initialState, action) {
  switch (action.type) {
    case UPDATE_MUSICS:
      return {
        ...state,
        musics: action.payload.musics
      };

    case UPDATE_GENRES:
      return {
        ...state,
        genres: action.payload.genres
      }

    case CLEAR_MUSICS:
      return {
        ...state,
        musics: []
      }

    case CHANGE_GENRE:
      return {
        ...state,
        selectedGenre: action.payload.genre
      }

    default:
      return state;
  }
}