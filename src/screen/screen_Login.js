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

      //Create a Google credential with the token
      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );
      //Sign-in the user with the credential
      await auth().signInWithCredential(credential);
      dispatch(setloggedIn(true));
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
    <View style={styles.body}>
      <View style={styles.sectionHeader}>
        <Image
        style={styles.logo}
          source={require('../assets/logo.png')}
        />
      </View>
      <View style={styles.sectionMain}>
        <Image
          source={require('../assets/illustration.png')}
        />
      </View>

      <View style={styles.sectionFooter}>
        <Text>
          <Text style={styles.textTitleColor}>Tối ưu </Text>
          <Text style={styles.textTitle}>và</Text>
          <Text style={styles.textTitleColor}> tiện lợi</Text>
        </Text>
        <View style={styles.textDescriptionView}>
        <Text style={styles.textDescription}>
          Tích hợp những tính năng cần thiết
        </Text>
        <Text style={styles.textDescription}>
          giúp việc học trở nên tối ưu
        </Text>
        </View>
        
        {!loggedIn && (
          <View style={styles.sectionContainer}>
            <GoogleSigninButton
              style={{ alignSelf: 'flex-start' }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={this._signIn}
            />
            {/* {!user && <Text style={{alignSelf:'center'}}>You are currently logged out</Text>} */}
          </View>
        )}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  sectionHeader: {
    flex: 2,
  },
  sectionMain: {
    flex: 4,
  },
  sectionFooter: {
    flex: 4,
    alignItems: 'center',
    
  },
  textTitleColor: {
    color: '#19a5ff',
    fontWeight: 'bold',
    fontSize: 25,
  },
  textTitle: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 25,
  },
  textDescriptionView: {
    color: '#344161',

    alignItems:'center',
    margin: 20
  },
  textDescription: {
    fontSize: 20,
    color:'#344161CC',
  },
  logo: {
    width:60,
    height:60,
    margin:50
  }
  // sectionContainer: {
  //   marginTop: 32,
  // },
  // sectionTitle: {
  //   fontSize: 28,
  //   fontWeight: '600',
  //   marginBottom: 10,
  // },
  // sectionDescription: {
  //   color: '#344161',
  //   fontSize: 15,
  //   fontWeight: '400',
  // },
  // logo: {
  //   marginTop: 20,
  //   resizeMode: 'stretch',
  // }
});