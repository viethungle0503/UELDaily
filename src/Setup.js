import React, { useEffect } from 'react';
// import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import  Store, { persistor } from './redux_toolkit/store';
import { PersistGate } from 'redux-persist/integration/react';

// Cload Messaging
import messaging from '@react-native-firebase/messaging';

// Notifee
import notifee, { AuthorizationStatus } from '@notifee/react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const Setup = () => {
    global.notifee = notifee;
    // async function requestUserPermission_Messaging() {
    //     const authStatus = await messaging().requestPermission();
    //     const enabled =
    //         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    //     if (enabled) {
    //         console.log('Authorization status:', authStatus);
    //     }
    // };
    // async function requestUserPermission_NotifeeIos() {
    //     // Request permissions (required for iOS)
    //     const settings = await notifee.requestPermission()
    //     if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
    //         console.log('User denied permissions request');
    //     } else if (settings.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
    //         console.log('User granted permissions request');
    //     } else if (settings.authorizationStatus === AuthorizationStatus.PROVISIONAL) {
    //         console.log('User provisionally granted permissions request');
    //     }
    // }
    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
            webClientId:
              '204536961808-0an6jvkhbjt7q5u2upeo0ff9g81400us.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
          });
        // requestUserPermission_Messaging();
        // requestUserPermission_NotifeeIos()

    }, [])
    return (
            <Provider store={Store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>

    )
};

export default Setup;