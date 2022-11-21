import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  Alert,
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
        Alert.alert('Thông báo', 'Vui lòng sử email trường cấp');
        signOut();
      } else {
        let i = 0;
        for (let element of database_app) {
          if (element.data.email == user.email) {
            i = 1;
          }
        }
        if (i == 0) {
          Alert.alert('Cảnh báo', 'Tài khoản không tồn tại!');
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
        <Image
          style={styles.sectionIllustration_EffectLeft}
          source={require('../assets/preLoginEffectLeft.png')}
        />
        <Image
          style={styles.sectionIllustration_EffectRight}
          source={require('../assets/preLoginEffectRight.png')}
        />
      </View>

      <View style={styles.sectionIllustration}>
        <Image
          style={styles.sectionIllustration_Image}
          source={require('../assets/preLogin3.png')}
        />
      </View>

      <View style={styles.sectionText}>
        <Text style={styles.sectionText_Title}>Đa tiện ích</Text>

        <View style={styles.sectionText_DescriptionView}>
          <Text style={styles.sectionText_DescriptionText}>
            Tích hợp những tiện ích khác hỗ trợ việc học tốt hơn
          </Text>
        </View>

        <View style={styles.readProgressView}>
          <View style={styles.readProgress}></View>
          <View style={styles.readProgress}></View>
          <View
            style={[
              styles.readProgress,
              {
                backgroundColor: '#0065FF',
              },
            ]}></View>
        </View>

        <View style={styles.btnStartView}>
          {!loggedIn && (
            <TouchableOpacity style={styles.btnStart} onPress={this._signIn}>
              {/* <MaterialCommunityIcons
                style={[
                  {
                    color: '#fff',
                  },
                ]}
                name={'google'}
                size={25}
              /> */}
              <Image
                style={styles.btnLoginIcon}
                source={require('../assets/icon-google.png')}
              />
              <Text style={styles.btnStartText}>
                Đăng nhập bằng tài khoản Google
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.sectionFooter}>
        <Image
          style={styles.sectionIllustration_EffectRightBottom}
          source={require('../assets/preLoginEffectRightBottom.png')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
  },
  sectionHeader: {
    flex: 1,
  },
  sectionIllustration: {
    flex: 5,
    alignItems: 'center',
  },
  sectionText: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  sectionFooter: {
    flex: 1,
    justifyContent: 'flex-start',
    position: 'relative',
  },
  sectionIllustration_Image: {
    aspectRatio: 0.8,
    flex: 1,
    resizeMode: 'contain',
  },
  sectionIllustration_EffectLeft: {
    position: 'absolute',
    top: 50,
    left: 0,
  },
  sectionIllustration_EffectRight: {
    position: 'absolute',
    top: 110,
    right: 0,
  },
  sectionIllustration_EffectRightBottom: {
    position: 'absolute',
    right: 0,
    bottom: -10,
  },
  sectionText_Title: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 25,
  },
  sectionText_DescriptionView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionText_DescriptionText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    color: '#344161CC',
  },
  readProgressView: {
    width: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  readProgress: {
    opacity: 1,
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: '#D9D9D9',
  },
  btnStartView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // marginHorizontal: 40,
  },

  btnStart: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',

    borderRadius: 8,
    backgroundColor: '#0065FF',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  btnStartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
  btnLoginIcon: {
    width: 25,
    height: 25,
  },
});
