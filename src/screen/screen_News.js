import React from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
  Table,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import LogOutButton from '../components/Button_LogOut';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import { setLoggedIn, setCurrentUser, setScoreBoard} from '../redux_toolkit/userSlice';
import auth from '@react-native-firebase/auth';

export default function News() {
  const dispatch = useDispatch();
  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      auth()
        .signOut()
        .then(() => {
          dispatch(setLoggedIn(false));
          dispatch(setCurrentUser({}))
          dispatch(setScoreBoard({}));
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
  <View style={styles.body}>

    {loggedIn && (
      <View style={styles.accountHeader}>
        <Image source={require={}} />

        <View>
          <Image
            style={styles.studentAvatar}
            source={{uri: currentUser.data.profileImage}}
          />
          {currentUser ? (
            <Text style={styles.studentName}>
              {currentUser.data.lastName + ` ${currentUser.data.firstName}`}
            </Text>
            ) : null}
          {/* <Text style={{color: 'red'}}>{currentUser.data.email}</Text> */}
          
          
        </View>
      </View>
    )}
    

    <View style={styles.accountPolicy}>
      <LogOutButton
        onPressFunction={signOut}
        title={loggedIn ? 'Dang xuat' : 'You are logged in'}
        color="#FFF6D5">

      </LogOutButton>

    </View>
    
  </View>
  );
}
const styles = StyleSheet.create({
 body:{
  flex: 1,
  flexDirection: 'column',


 },
 accountHeader:{
  flex: 3,
  backgroundColor: 'red',
  justifyContent: 'center',
  alignItems: 'center',
},
accountPolicy:{
  backgroundColor: 'blue',
  flex: 4,

 },
studentName: {
  fontWeight: 'bold',
  fontSize: 18,
  color: '#252525',
},
studentAvatar: {
  width: 100,
  aspectRatio: 1,
  borderRadius: 100,
  // marginRight: 10,

},
});
