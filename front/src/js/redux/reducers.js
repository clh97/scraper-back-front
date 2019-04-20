import { UPDATE_MUSICS, UPDATE_GENRES, CLEAR_MUSICS } from './actions';

const initialState = {
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

    default:
      return state;
  }
}