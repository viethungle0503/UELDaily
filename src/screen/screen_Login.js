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
import react, {useState, useEffect} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {
  setUser,
  setLoggedIn,
  setUID,
  setCurrentUser,
} from '../redux_toolkit/userSlice';

import {Icon} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Login({navigation}) {
  // const database_app = useSelector((state) => state.database.db_app);
  const dispatch = useDispatch();

  function onAuthStateChanged(user) {
    dispatch(setUser(user));
    if (user) {
      if (user.email.search(/@st.uel.edu.vn/i) == -1) {
        alert('Vui lòng sử mail email trường cấp');
        signOut();
      } else {
        let i = 0;
        for (let element of database_app) {
          if (element.data.email == user.email) {
            i = 1;
          }
        }
        if (i == 0) {
          alert('Tài khoản không tồn tại');
          signOut();
        } else {
          for (let element of database_uel) {
            if (element.data.email == user.email) {
              dispatch(setCurrentUser(element));
            }
          }
          dispatch(setLoggedIn(true));
        }
      }
    }
  }

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '204536961808-0an6jvkhbjt7q5u2upeo0ff9g81400us.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    // unsubscribe on unmount
    return subscriber;
  }, []);

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      auth()
        .signOut()
        .then(() => {
          dispatch(setLoggedIn(false));
          dispatch(setUser([]));
        });
    } catch (error) {
      console.error(error);
    }
  };
  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      //Get the user ID token
      const {accessToken, idToken} = await GoogleSignin.signIn();

      //Create a Google credential with the token
      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );
      //Sign-in the user with the credential
      await auth().signInWithCredential(credential);
      // dispatch(setLoggedIn(true));
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
  return (
    <View style={styles.body}>
      <View style={styles.sectionHeader}>
        <Image style={styles.logo} source={require('../assets/logo.png')} />
      </View>
      <View style={styles.sectionMain}>
        <Image source={require('../assets/illustration.png')} />
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
            {/* <FontAwesomeIcon icon={('fa-brands fa-google')} style={{color: '#fff'}} /> */}
            <GoogleSigninButton
              style={{alignSelf: 'flex-start'}}
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
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
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

    alignItems: 'center',
    margin: 20,
  },
  textDescription: {
    fontSize: 20,
    color: '#344161CC',
  },
  logo: {
    width: 60,
    height: 60,
    margin: 50,
  },
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
