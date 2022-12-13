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
          <View style={styles.studentAvatarContainer}>
            <Image
              style={styles.studentAvatar}
              source={{uri: currentUser.data.profileImage}}
            />

          </View>

          {currentUser ? (
            <Text style={styles.studentName}>
              {currentUser.data.lastName + " " + currentUser.data.firstName}
            </Text>
            ) : null}
        </View>

        
      </View>
    )}
    <View style={styles.accountInfoContainer}>
      <Text style={styles.accountHeading}>Thông tin</Text>

      <TouchableOpacity style={styles.accountListItem}>

        <View style={styles.row}>
          <Image 
            source={require('../assets/account_userinfo.png')}
            style={styles.accountListItem_IconTitle}
          />
          <Text style={styles.accountText}>
           Thông tin sinh viên
          </Text>

        </View>

        <View style={styles.row}>

          <Image 
            source={require('../assets/account_btnOpen.png')}
            style={styles.accountListItem_IconOpen}
          />

        </View>

      </TouchableOpacity>

    </View>

    {/* cài đặt section */}
    <View style={styles.accountSettingContainer}>
      <Text style={styles.accountHeading}>Cài đặt</Text>

      <TouchableOpacity style={styles.accountListItem}>

        <View style={styles.row}>
          <Image 
            source={require('../assets/account_userinfo.png')}
            style={styles.accountListItem_IconTitle}
          />
          <Text style={styles.accountText}>
            Ngôn ngữ
          </Text>

        </View>

        <View style={styles.row}>
          <Text style={styles.accountDataText}>Tiếng Việt</Text>

          <Image 
            source={require('../assets/account_btnOpen.png')}
            style={styles.accountListItem_IconOpen}
          />

        </View>

      </TouchableOpacity>

    </View>
    {/* cài đặt section */}

    <View style={styles.accountPolicy}>
      <Text style={styles.accountHeading}>Điều khoản và sử dụng</Text>

      <TouchableOpacity style={styles.accountListItem}>
        <View style={styles.row}>
          <Image 
            source={require('../assets/account_hoidap.png')}
            style={styles.accountListItem_IconTitle}
          />
          <Text style={styles.accountText}>
          Hỏi đáp về ứng dụng
          </Text>

        </View>

      </TouchableOpacity>
      <TouchableOpacity style={styles.accountListItem}>
        <View style={styles.row}>
          <Image 
            source={require('../assets/account_quydinh.png')}
            style={styles.accountListItem_IconTitle}
          />
          <Text style={styles.accountText}>
          Quy định sử dụng và chính sách người dùng
          </Text>

        </View>

      </TouchableOpacity>
      <TouchableOpacity style={styles.accountListItem}>
        <View style={styles.row}>
          <Image 
            source={require('../assets/account_chinhsach.png')}
            style={styles.accountListItem_IconTitle}
          />
          <Text style={styles.accountText}>
          Chính sách quyền riêng tư
          </Text>

        </View>

      </TouchableOpacity>

      <TouchableOpacity style={styles.btnLogout} onPress={signOut}>
        
        <Text style={styles.btnLogoutText}>
          Đăng xuất
        </Text>

      </TouchableOpacity>

    </View>
    
  </View>
  );
}
const styles = StyleSheet.create({
body:{
  flex: 1,
  flexDirection: 'column',


},
accountHeading:{
  color: '#080B09',
  fontWeight:'600',
  paddingBottom: 5,
  paddingTop: 10,
  fontSize: 18,

},
accountText:{
  color: '#252525',
  fontWeight: '500',
  fontSize: 16,
},
accountDataText:{
  color: '#938F8F',
  fontSize: 16,
},

accountHeader:{
  flex: 3,
  justifyContent: 'center',
  alignItems: 'center',
  // zIndex: 1,
  backgroundColor: '#FFF',
  // paddingVertical: 5
},
accountInfoContainer:{
  flex: 1,
  paddingVertical: 10,
  paddingHorizontal: 20,
  backgroundColor:"#FFF",

  zIndex: 1,

},
accountSettingContainer:{
  flex: 1,
  paddingVertical: 10,
  paddingHorizontal: 20,
  backgroundColor:"#FFF",
  marginVertical: 6,

},
accountPolicy:{
  flex: 4,
  paddingVertical: 10,
  paddingHorizontal: 20,
  backgroundColor:"#FFF",

},

/* illustration and user info start*/

accountHeader_Illustration:{
  width: "100%",
  height: "100%",
  

  zIndex: 2,

  position: 'absolute',
  // left: 0,
  // right: 0,
  // bottom: 0,


},
accountHeader_AvaNameContainer: {
  alignItems: 'center',
  zIndex: 3
},
studentAvatarContainer:{
  borderColor: 'rgba(255, 110, 53, 1)',
  padding: 5,
  borderWidth: 1,
  borderRadius: 100,
  
  
},
studentAvatar: {
  width: 100,
  aspectRatio: 1,
  borderRadius: 100,
  
  

},
studentName: {
  fontWeight: 'bold',
  fontSize: 19,
  color: '#252525',
  marginTop: 10
},
/* illustration and user info end*/


/* section cài đặt ngôn ngữ  */
accountListItem:{
  paddingVertical: 10,
  
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',

  backgroundColor: '#FFF',
  
},
row:{
  flexDirection: 'row',
  alignItems: 'center',

},

accountListItem_IconTitle:{
  width: 30,
  aspectRatio: 1,
  marginRight: 8
},
accountListItem_IconOpen:{
  width: 11,
  aspectRatio: 0.6,
  marginLeft: 10
},

/* section cài đặt ngôn ngữ  */



/* section điều khoản sử dụng */

btnLogoutContainer:{
  // flex: 1,
  flexDirection: 'row',
  alignItems: 'stretch',
  alignContent: 'stretch',
  
},
btnLogout:{
  marginTop: 20,
  backgroundColor: 'rgba(255, 110, 53, 1)',
  paddingVertical: 10,
  borderRadius: 8,
  color: '#FFF',
  // alignSelf: 'stretch',
  justifyContent: 'center'
},
btnLogoutText:{
  color: '#FFF',
  fontSize: 16,
  fontWeight: '500',
  textAlign: 'center'
}
/* section điều khoản sử dụng */






});
