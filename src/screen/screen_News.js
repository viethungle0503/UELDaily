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
  Modal,
  Pressable,
  ImageBackground


} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import LogOutButton from '../components/Button_LogOut';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import { setLoggedIn, setCurrentUser, setScoreBoard} from '../redux_toolkit/userSlice';
import auth from '@react-native-firebase/auth';
import { abs } from 'react-native-reanimated';

import { Picker } from '@react-native-picker/picker';
import {useState} from 'react';

export default function News() {
  const [openUserInfo, setOpenUserInfo] = React.useState(false);

  const [openLanguage, setOpenLanguage] = React.useState(false);

  const [selectLanguageVie, setselectLanguageVie] = React.useState(false);
  const clickLanguageVie = () => {
    setselectLanguageVie(!selectLanguageVie);
  };

  const [selectLanguageEng, setselectLanguageEng] = React.useState(false);
  const clickLanguageEng = () => {
    setselectLanguageEng(!selectLanguageEng);
  };


  
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
  <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>

    {loggedIn && (
      <ImageBackground 
        resizeMode='contain'
        source={require('../assets/account_illustration.png')}
        style={styles.accountHeader}>
        

        <View style={styles.accountHeader_Content}>
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

      </ImageBackground>

   
    )}

    {/* trang thông tin sinh viên chi tiết */}
    <Modal 
      visible={openUserInfo}
      transparent={true}>

      <View style={styles.modalContainer}>
        <Image
          style={styles.effectLeft}
          source={require('../assets/preLoginEffectLeft.png')}
        />
        <Image
          style={styles.modalEffect}
          source={require('../assets/mediaEffect.png')}
        />

        <View style={styles.modalHeader}> 
          <TouchableOpacity 
            style={styles.modalHeader_btnBackContainer}  
            onPress={() => setOpenUserInfo(false)}
          >
            <Image 
            source={require('../assets/btnBack.png')} 
            style={styles.modalHeader_btnBack}/>
            
          </TouchableOpacity>

          <Text style={styles.modalHeader_Title}>
            Thông tin sinh viên
          </Text>

        </View>

        <View style={styles.modalContent}>
          <View style={[styles.modalContentItem, { }]}>
            <View style={[styles.row,{marginBottom: 10}]}> 
              <Image 
                source={require('../assets/account_thongtin_coban.png')}
                style={styles.modalContentItem_Icon}
              />
              <Text style={styles.accountHeading}>Thông tin cơ bản</Text>
            </View>


            <View style={styles.modalContentItem_RowInfo}>
              <Text style={styles.modalContentItem_RowInfo_Title}>Họ và tên</Text>
              <Text style={styles.modalContentItem_RowInfo_Data}>
              {currentUser.data.lastName + " " + currentUser.data.firstName}
              </Text>
            </View>

            <View style={styles.modalContentItem_RowInfo}>
              <Text style={styles.modalContentItem_RowInfo_Title}>Email</Text>
              <Text style={styles.modalContentItem_RowInfo_Data}>
              {currentUser.data.email}
              </Text>
            </View>

            <View style={styles.modalContentItem_RowInfo}>
              <Text style={styles.modalContentItem_RowInfo_Title}>MSSV</Text>
              <Text style={styles.modalContentItem_RowInfo_Data}>
              {currentUser.key}
              </Text>
            </View>

            <View style={styles.modalContentItem_RowInfo}>
              <Text style={styles.modalContentItem_RowInfo_Title}>Ngày sinh</Text>
              <Text style={styles.modalContentItem_RowInfo_Data}>
              11/03/2002
              </Text>
            </View>

            <View style={styles.modalContentItem_RowInfo}>
              <Text style={styles.modalContentItem_RowInfo_Title}>Nguyên quán</Text>
              <Text style={styles.modalContentItem_RowInfo_Data}>
              TPHCM
              </Text>
            </View>

          </View>

          <View style={[styles.modalContentItem, {marginVertical: 4 }]}>
            <View style={[styles.row,{marginBottom: 10}]}>
              <Image 
                source={require('../assets/account_thongtin_lienhe.png')}
                style={styles.modalContentItem_Icon}
              />
              <Text style={styles.accountHeading}>Thông tin liên hệ</Text>
            </View>

            <View style={styles.modalContentItem_RowInfo}>
              <Text style={styles.modalContentItem_RowInfo_Title}>Điện thoại</Text>
              <Text style={styles.modalContentItem_RowInfo_Data}>
              0969830296
              </Text>
            </View>

            <View style={styles.modalContentItem_RowInfo}>
              <Text style={styles.modalContentItem_RowInfo_Title}>Email cá nhân</Text>
              <Text style={styles.modalContentItem_RowInfo_Data}>
              stngan32@gmail.com
              </Text>
            </View>


          </View>

          <View style={[styles.modalContentItem, {flex: 3 }]}>
            <View  style={[styles.row,{marginBottom: 10}]}>
              <Image 
                source={require('../assets/account_thongtin_khoahoc.png')}
                style={styles.modalContentItem_Icon}
              />
              <Text style={styles.accountHeading}>Thông tin khóa học</Text>
            </View>


            <View style={styles.modalContentItem_RowInfo}>
              <Text style={styles.modalContentItem_RowInfo_Title}>Khóa học</Text>
              <Text style={styles.modalContentItem_RowInfo_Data}>
              Khóa 20
              </Text>
            </View>

            <View style={styles.modalContentItem_RowInfo}>
              <Text style={styles.modalContentItem_RowInfo_Title}>Niên khóa</Text>
              <Text style={styles.modalContentItem_RowInfo_Data}>
              2020-2024
              </Text>
            </View>

            <View style={styles.modalContentItem_RowInfo}>
              <Text style={styles.modalContentItem_RowInfo_Title}>Chương trình đào tạo</Text>
              <Text style={styles.modalContentItem_RowInfo_Data}>
              Hệ thống thông tin quản lý Chất lượng cao Khóa 20
              </Text>
            </View>

            <View style={styles.modalContentItem_RowInfo}>
              <Text style={styles.modalContentItem_RowInfo_Title}>Lớp</Text>
              <Text style={styles.modalContentItem_RowInfo_Data}>
              K20406C
              </Text>
            </View>


          </View>

        
        </View>

      </View>
      
    </Modal>
    {/* trang thông tin sinh viên chi tiết */}


    <View style={styles.accountInfoContainer}>
      <Text style={styles.accountHeading}>Thông tin</Text>

      <TouchableOpacity 
        style={styles.accountListItem} 
        onPress={()=> setOpenUserInfo(true)} >

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

      <TouchableOpacity 
        style={styles.accountListItem} 
        onPress={() => setOpenLanguage(true)}>

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


      <Modal
        visible={openLanguage}
        transparent={true}>

        <View 
          style={styles.langBackground} 
          onPress={() => setOpenLanguage(false)}>

          <View style={styles.langContainer}>

            <Text style={styles.accountHeading}>Chọn ngôn ngữ</Text>

            <TouchableOpacity 
                onPressIn={clickLanguageVie}
                style={selectLanguageVie? 
                  styles.langNation_Vie : 
                  [styles.langNation_Vie,
                    {
                      backgroundColor: 'rgb(210, 230, 255)',
                      borderColor: '#0065FF',
                      borderWidth: 1,

                      borderRadius: 5,
                    }
                  ]
              }>
              <View style={styles.row}>
                <Image 
                  source={require('../assets/account_lang_vie.png')}
                  style={styles.langNationIcon}
                />

                <Text style={styles.accountText}>Tiếng Việt</Text>

              </View>
              <Image 
                style={selectLanguageVie? 
                    styles.langSelectNationIcon : 
                    [styles.langSelectNationIcon,
                      {
                        opacity: 1,
                      }
                    ]}
                source={require('../assets/account_lang_check.png')}
                
              />

            </TouchableOpacity>

            <TouchableOpacity 
                onPressIn={clickLanguageEng}
                style={selectLanguageEng? 
                  styles.langNation_Eng : 
                  [styles.langNation_Eng,
                    {
                      backgroundColor: 'rgb(210, 230, 255)',
                      borderColor: '#0065FF',
                      borderWidth: 1,
                      borderRadius: 5,
                    }
                  ]
              }>

              <View style={styles.row}>
                <Image 
                  source={require('../assets/account_lang_eng.png')}
                  style={styles.langNationIcon}
                />

                <Text style={styles.accountText}>Tiếng Anh</Text>

              </View>

              <Image 
                style={selectLanguageEng? 
                    styles.langSelectNationIcon : 
                    [styles.langSelectNationIcon,
                      {
                        opacity: 1,
                      }
                    ]}
                source={require('../assets/account_lang_check.png')}
                
              />
              

            </TouchableOpacity>

            <TouchableOpacity
              style={styles.langFooter_ButtonClose}
              onPress={() => setOpenLanguage(false)}>
              <Text 
              style={{color: '#FFF', fontSize: 16, fontWeight: '600'}}>
              Xác nhận
              </Text>
            </TouchableOpacity>

          </View>
        </View>

      </Modal>
      

    </View>
    {/* cài đặt section */}

    <View style={styles.accountPolicyContainer}>
      <Text style={styles.accountHeading}>Điều khoản và sử dụng</Text>

      <TouchableOpacity style={styles.accountListItem}>
        <View style={styles.row}>
          <Image 
            source={require('../assets/account_hoidap.png')}
            style={styles.accountListItem_IconTitle}
          />
          <Text style={styles.policy_accountText}>
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
          <Text style={styles.policy_accountText}>
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
          <Text style={styles.policy_accountText}>
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
    
  </ScrollView>
  );
}
const styles = StyleSheet.create({
body:{
  flex: 1,
  flexDirection: 'column',
  marginBottom: 50, 

},
/* chia layout */
accountHeader:{


  width: '100%',
  height: 300, 
  // height: '100%',
  backgroundColor: '#FFF',

  flexDirection: 'column',
  justifyContent: 'center',

  alignItems: 'center',
  zIndex: 2,
},
accountInfoContainer:{
  // flex: 1,
  paddingVertical: 10,
  paddingHorizontal: 20,
  backgroundColor:"#FFF",

  zIndex: 1,

},
accountSettingContainer:{
  // flex: 1,
  paddingVertical: 10,
  paddingHorizontal: 20,
  backgroundColor:"#FFF",
  marginVertical: 6,

},
accountPolicyContainer:{
  // flex: 4,
  paddingVertical: 10,
  paddingHorizontal: 20,
  backgroundColor:"#FFF",

},

/* phần đầu: illustration và hình tên user */

accountHeader_Content: {
 

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
  fontSize: 20,
  color: '#252525',
  marginTop: 15, 
},
/* illustration and user info end*/

/*change language popup  */
langBackground: {
  flex: 1,
  backgroundColor: '#000000aa',
  justifyContent: 'center',
  alignItems: 'center'
},
langContainer: {
  width: '75%',
  backgroundColor: '#FFF',
  paddingHorizontal: 25,
  paddingVertical: 20,

  borderRadius: 20,
  elevation: 20,
  
},
langNation_Vie:{
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 15,
  justifyContent: 'space-between',

},  
langNation_Eng:{
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 15,
  justifyContent: 'space-between',
},  
langNationIcon:{
  height: 25,
  aspectRatio: 0.9,
  marginRight: 10,
},
langSelectNationIcon:{
  width: 30,
  aspectRatio: 1,
  opacity: 0,

},
langFooter_ButtonClose: {
  backgroundColor: '#0065FF',

  color: '#0065FF',
  borderRadius: 8,
  width: '100%',
  height: 35,

  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginVertical: 15,
},
/*change language popup  */


/* user info */
modalContainer: {
  flex: 1,
  backgroundColor: '#F6F6F6',
  position: 'relative'
},
modalEffect:{
  position: 'absolute',
  top: 30,
  right: 0,
  zIndex: 1
  
},
effectLeft: {
  position: 'absolute',
  bottom: 40,
  left: 0,
  zIndex: 1,

},
modalHeader:{
  flexDirection: 'row',
  alignItems: 'center', 
  paddingTop: 20,
  paddingBottom: 10,
  paddingHorizontal: 15, 
  backgroundColor: '#FFF',
},
modalHeader_btnBackContainer: {
  width: 25,
},
modalHeader_btnBack: {
  width: '100%',
  height: undefined,
  aspectRatio: 1,
  resizeMode: 'contain'
},
modalHeader_Title:{
  fontSize: 19, 
  fontWeight: '700', 
  color: '#252525',
  paddingHorizontal: 10,
},
modalContent:{
  flex: 1,

},
modalContentItem:{
  backgroundColor: '#FFF',
  paddingHorizontal: 20,
  paddingTop: 15,
  paddingBottom: 25,

},
modalContentItem_Icon:{
  width: 35,
  aspectRatio: 1,
  marginRight: 8
},
modalContentItem_RowInfo:{
  flexDirection: 'row',
  // alignItems: 'center',
  paddingTop: 2,
  paddingBottom: 10,
  width: '100%',
  


},
modalContentItem_RowInfo_Title:{
  marginRight: 10,

  flexDirection: 'row',
  flexWrap: 'wrap',

  color: '#938F8F',
  fontSize: 16,

  width: '30%',
 
  // backgroundColor: 'blue'
},
modalContentItem_RowInfo_Data:{
  color: '#252525',
  fontWeight: '500',
  fontSize: 16,

  // backgroundColor: 'red',
  width: "70%",

},
/* user info */

/* font  */
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




/* section cài đặt ngôn ngữ  */
accountListItem:{
  paddingVertical: 10, 

  
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',

  
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
policy_accountText:{
  color: '#252525',
  fontWeight: '500',
  fontSize: 16,
  width: '90%',

},
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
