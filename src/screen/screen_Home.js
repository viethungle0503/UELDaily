import {
  View,
  Text,
  StyleSheet,
  Button,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { setUser, setloggedIn } from '../redux/actions';
import LogOutButton from '../components/Button_LogOut';

export default function Home() {
  const dispatch = useDispatch();
  const { user, loggedIn } = useSelector(state => state.userReducer);
  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      auth()
        .signOut()
        .then(() => {
          dispatch(setloggedIn(false));
        });
      // setuserInfo([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      {
        loggedIn && (
          <View style={styles.buttonContainer}>
            {
              user && <Text style={styles.text}>Welcome {user.displayName}</Text>
            }
            <LogOutButton
              onPressFunction={signOut}
              title={loggedIn ? 'Log out'  : 'You are logged in'}
              color="#FFF6D5"
            >
            </LogOutButton>
          </View>
        )
      }
    </View>


  );

};

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 25,
    color: '#21D463',
  }
});