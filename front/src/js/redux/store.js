import { createStore } from 'redux';
import { musics } from './reducers';

export default createStore(musics, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());