import {createStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import {userReducer, databaseReducer} from './reducers';

const rootReducer = combineReducers({userReducer,databaseReducer});

export const Store = createStore(rootReducer, applyMiddleware(thunk));