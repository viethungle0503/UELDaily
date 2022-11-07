import React from 'react';
// import ReactDOM from 'react-dom/client';
import App from './App';
import Auth from '@react-native-firebase/auth';
import { Provider } from 'react-redux';
import Store from './redux_toolkit/store';
const Setup = () => {
    global.auth = Auth;
    return (
        <Provider store={Store}>
                <App/>
        </Provider>
    )
};

export default Setup;