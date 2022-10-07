import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Image,
} from 'react-native';

import {
  Colors,

} from 'react-native/Libraries/NewAppScreen';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import react, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setloggedIn } from '../redux/actions';

export default function Login({navigation}) {
  const {user, loggedIn} = useSelector(state => state.userReducer);
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
  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      auth()
        .signOut()
        .then(() => alert('Your are signed out!'));
      dispatch(setloggedIn(false));
      // setuserInfo([]);
    } catch (error) {
      console.error(error);
    }
  };
  function onAuthStateChanged(user) {
    dispatch(setUser(user)) ;
    console.log(user);
    if (user) dispatch(setloggedIn(true)) ;
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
      <StatusBar barStyle="dark-content" />
      
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.logo} />
              <Image
              source={require('../assets/illustration.png')}
              style={styles.logo}/>
              <Text style={styles.sectionTitle}>
                Tối ưu và tiện lợi 
              </Text>
              <Text style={styles.sectionDescription}>
                Tích hợp những tính năng cần thiết giúp việc học trở nên tối ưu
              </Text>
            <View style={styles.sectionContainer}>
              {!loggedIn && (
                <GoogleSigninButton
                  style={{ width: 192, height: 48 }}
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Dark}
                  onPress={this._signIn}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              {!user && <Text>You are currently logged out</Text>}
              {user && 
                <View>
                  <Text>Welcome {user.displayName}</Text>
                  <Button
                    onPress={this.signOut}
                    title="LogOut"
                    color="red"></Button>
                </View>
              }
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
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
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  logo: {
    marginTop: 20,
    resizeMode: 'stretch',
  }
});