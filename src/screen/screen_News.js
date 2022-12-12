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
import { abs } from 'react-native-reanimated';

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
        
        <Image
          style={styles.accountHeader_Illustration}
          source={require('../assets/account_illustration.png')} 
        />

        <View style={styles.accountHeader_AvaNameContainer}>
          <Image
            style={styles.studentAvatar}
            source={{uri: currentUser.data.profileImage}}
          />
          {currentUser ? (
            <Text style={styles.studentName}>
              {currentUser.data.lastName + ` ${currentUser.data.firstName}`}
            </Text>
            ) : null}
        </View>
      </View>
    )}
    <TouchableOpacity style={styles.accountSetting}>

      <View style={styles.accountSetting_Title}>
        <Image 
          source={require('../../assets/mediaContact_Email.png')}
          style={styles.accountSetting_TitleIcon}
        />
        <Text style={styles.accountSetting_TitleText}>Email:</Text>
      </View>

      
  
    </TouchableOpacity>

    <View style={styles.accountPolicy}>
      <LogOutButton
        onPressFunction={signOut}
        title={loggedIn ? 'Đăng xuất' : 'You are logged in'}
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
  flex: 4,
  backgroundColor: 'red',
  justifyContent: 'center',
  alignItems: 'center',
},
accountSetting:{
  flex: 2,
},
accountPolicy:{
  backgroundColor: 'blue',
  flex: 3,

},

/* illustration and user info start*/
accountHeader_Illustration:{
  width: "100%",
  height: "100%",

  zIndex: -1,

  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,


},
accountHeader_AvaNameContainer: {
  alignItems: 'center',
},
studentAvatar: {
  width: 100,
  aspectRatio: 1,
  borderRadius: 100,
  

},
studentName: {
  fontWeight: 'bold',
  fontSize: 18,
  color: '#252525',
  marginBottom: 5
},
/* illustration and user info end*/


/* section cài đặt ngôn ngữ  */
accountSetting_:{
  paddingVertical: 10,
},
accountSetting_Title:{
  flexDirection: 'row', 
  alignItems: 'center'
},
accountSetting_TitleIcon:{
  width: 25,
  aspectRatio: 1,
  marginRight: 5
},
accountSetting_TitleText:{
  color: '#625F5F',
  fontSize: 16,
},
/* section cài đặt ngôn ngữ  */



/* section điều khoản sử dụng */

/* section điều khoản sử dụng */






});
