import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  Image,
} from 'react-native';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import react, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setloggedIn } from '../redux/actions';

export default function Login({ navigation }) {
  const { user, loggedIn } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  // const [loggedIn, setloggedIn] = useState(false);
  // const [user, setUser] = useState([]);
  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      //Get the user ID token
      const { accessToken, idToken } = await GoogleSignin.signIn();
      dispatch(setloggedIn(true));
      //Create a Google credential with the token
      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );
      //Sign-in the user with the credential
      await auth().signInWithCredential(credential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        alert('Some other error happened:' + error);
        // some other error happened
      }
    }
  };

  function onAuthStateChanged(user) {
    dispatch(setUser(user));
    console.log(user);
    if (user) dispatch(setloggedIn(true));
  }
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '204536961808-0an6jvkhbjt7q5u2upeo0ff9g81400us.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  return (
    <>
      <View style={styles.body}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo} />
        <Image
          source={require('../assets/illustration.png')}
          style={styles.logo} />
        <Text style={styles.sectionTitle}>
          <Text style={{ color: '#19a5ff', fontWeight: 'bold' }}>Tối ưu </Text>
          <Text style={{ fontWeight: 'bold', color: 'black' }}>và</Text>
          <Text style={{ color: '#19a5ff', fontWeight: 'bold' }}> tiện lợi</Text>

        </Text>
        <Text style={styles.sectionDescription}>
          Tích hợp những tính năng cần thiết
        </Text>
        <Text style={styles.sectionDescription}>
          giúp việc học trở nên tối ưu  
        </Text>
        <View style={styles.sectionContainer}>
          {!loggedIn && (
            <GoogleSigninButton
              style={{ alignSelf: 'flex-start' }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={this._signIn}
            />
          )}
        </View>
        <View style={styles.buttonContainer}>
          {!user && <Text>You are currently logged out</Text>}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonContainer: {
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 10,
  },
  sectionDescription: {
    color: '#344161',
    fontSize: 15,
    fontWeight: '400',
  },
  logo: {
    marginTop: 20,
    resizeMode: 'stretch',
  }
});