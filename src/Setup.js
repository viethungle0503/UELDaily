import React, {useEffect} from 'react';
// import ReactDOM from 'react-dom/client';
import AppWrapper from './App';
import {Provider} from 'react-redux';
import Store, {persistor} from './redux_toolkit/store';
import {PersistGate} from 'redux-persist/integration/react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
// import { NativeModules } from 'react-native'
const Setup: React.FC = () => {
  // NativeModules.DevSettings.setIsDebuggingRemotely(true)
  const queryClient = new QueryClient();
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '204536961808-0an6jvkhbjt7q5u2upeo0ff9g81400us.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }, []);
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <AppWrapper />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default Setup;
