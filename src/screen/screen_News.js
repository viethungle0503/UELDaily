import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
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
  import LogOutButton from '../components/Button_LogOut';
export default function News() {
    const { user, loggedIn } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const signOut = async () => {
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          auth()
            .signOut()
            .then(() => {
              dispatch(setloggedIn(false));
            });
          dispatch(setUser([]));
        } catch (error) {
          console.error(error);
        }
      };
    return(
    <View>
        <LogOutButton
            onPressFunction={signOut}
            title={loggedIn ? 'Log out' : 'You are logged in'}
            color="#FFF6D5"
        >
        </LogOutButton>
    </View>

    )
};
const styles = StyleSheet.create({
    btnSignOut: {
        height: 40,
        backgroundColor: '#fff'

    }
});