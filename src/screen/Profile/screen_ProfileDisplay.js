import React, { useEffect, useState } from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  ImageBackground,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  setLoggedIn,
  setCurrentUser,
  setCurrentLanguage,
  setProfileImage,
  setUnreadNotice,
  setSchedule,
  setScoreBoard,
  setTestSchedule,
  setModules,
  setLateModules,
  setTuition,
  setActivityScore,
} from '../../redux_toolkit/userSlice';
import auth from '@react-native-firebase/auth';
import styles from './ProfileStyles/screen_ProfileDisplay_style';
import strings from '../Language';


export default function ProfileDisplay({ navigation }) {
  const loggedIn = useSelector(state => state.user.loggedIn);
  const currentUser = useSelector(state => state.user.currentUser);
  const profileImage = useSelector(state => state.user.profileImage);
  function showAlert() {
    Alert.alert(
      "Thông báo",
      // "Tính năng này chưa được phát triển, đang đợi chị Ngân, chị Ngọc, chị Huyền và anh Bình cho biết thêm thông tin @@",
      "Tính năng này hiện chưa được cập nhật thông tin",
      [
        {
          text: "Cancel",
          onPress: () => Alert.alert("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => Alert.alert("OK Pressed") }
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            "This alert was dismissed by tapping outside of the alert dialog."
          ),
      }
    );
  }
  const currentLanguage = useSelector(state => state.user.currentLanguage);
  const [openLanguageMenu, setopenLanguageMenu] = React.useState(false);
  const [VNLanguage, setVNLanguage] = React.useState((currentLanguage == "vn") ? true : false);
  const chooseVNLanguage = () => {
    setVNLanguage(!VNLanguage);
    setENLanguage(!ENLanguage);
  };

  const [ENLanguage, setENLanguage] = React.useState((currentLanguage == "en") ? true : false);
  const chooseENLanguage = () => {
    setENLanguage(!ENLanguage);
    setVNLanguage(!VNLanguage);
  };
  const dispatch = useDispatch();
  const confirmSignout = () => {
    Alert.alert(
      "Thông báo",
      "Bạn có chắc chắn muốn đăng xuất?",
      [
        {
          text: "Cancel",
          onPress: () => {return},
          style: "cancel",
        },
        { text: "OK", onPress: () => signOut() }
      ],
      {
        cancelable: true,
        onDismiss: () => {return},
      }
    );
  }
  const signOut = async () => {

    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      auth()
        .signOut()
        .then(() => {
          setTimeout(() => {
            dispatch(setLoggedIn(false));
            dispatch(setCurrentUser({}));
            dispatch(setProfileImage(""))
            dispatch(setUnreadNotice(0));
            dispatch(setSchedule({}));
            dispatch(setScoreBoard([{ title: "Hello", data: [] }]));
            dispatch(setTestSchedule([]));
            dispatch(setModules([]));
            dispatch(setLateModules([]));
            dispatch(setTuition([]));
            dispatch(setActivityScore([]))
          },250)

        });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (currentLanguage == "vn") {
      setVNLanguage(true);
      setENLanguage(false)
    }
    else {
      setVNLanguage(false);
      setENLanguage(true)
    }
  }, [currentLanguage])

  return (
    <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
      {loggedIn && (
        <ImageBackground
          resizeMode="contain"
          source={require('../../assets/account_illustration.png')}
          style={styles.accountHeader}>
          <View style={styles.accountHeader_Content}>
            <View style={styles.studentAvatarContainer}>
              <Image
                style={styles.studentAvatar}
                source={{ uri: profileImage }}
              />
            </View>

            {(currentUser != {}) ? (
              <Text style={styles.studentName}>
                {currentUser.lastName + ' ' + currentUser.firstName}
              </Text>
            ) : null}
          </View>
        </ImageBackground>
      )}
      <View style={styles.accountInfoContainer}>
        <Text style={styles.accountHeading}>{strings.account}</Text>

        <TouchableOpacity
          style={styles.accountListItem}
          onPress={() => navigation.navigate("PersonalInformation")}>
          <View style={styles.row}>
            <Image
              source={require('../../assets/account_user.png')}
              style={styles.accountListItem_IconTitle}
            />
            <Text style={styles.accountText}>{strings.student_information}</Text>
          </View>

          <View style={styles.row}>
            <Image
              source={require('../../assets/account_btnOpen.png')}
              style={styles.accountListItem_IconOpen}
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* cài đặt section */}
      <View style={styles.accountSettingContainer}>
        <Text style={styles.accountHeading}>{strings.setting}</Text>

        <TouchableOpacity
          style={styles.accountListItem}
          onPress={() => setopenLanguageMenu(true)}>
          <View style={styles.row}>
            <Image
              source={require('../../assets/account_userinfo.png')}
              style={styles.accountListItem_IconTitle}
            />
            <Text style={styles.accountText}>{strings.language}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.accountDataText}>{(currentLanguage == "vn") ? "Tiếng Việt" : "English"}</Text>

            <Image
              source={require('../../assets/account_btnOpen.png')}
              style={styles.accountListItem_IconOpen}
            />
          </View>
        </TouchableOpacity>

        <Modal visible={openLanguageMenu} transparent={true} onRequestClose={() => setopenLanguageMenu(false)}>
          <View
            style={styles.langBackground}>
            <View style={styles.langContainer}>
              <Text style={styles.accountHeading}>{strings.select_language}</Text>

              <TouchableOpacity
                onPress={chooseVNLanguage}
                style={
                  VNLanguage
                    ? [
                      styles.langNation_Vie,
                      {
                        backgroundColor: 'rgb(210, 230, 255)',
                        borderColor: '#0065FF',
                        borderWidth: 1,
                        borderRadius: 5,
                      },
                    ]
                    : styles.langNation_Vie
                }>
                <View style={styles.row}>
                  <Image
                    source={require('../../assets/account_lang_vie.png')}
                    style={styles.langNationIcon}
                  />
                  <Text style={styles.accountText}>{strings.vietnamese}</Text>
                </View>
                <Image
                  style={
                    VNLanguage
                      ? [
                        styles.langSelectNationIcon,
                        {
                          opacity: 1,
                        },
                      ]
                      : styles.langSelectNationIcon
                  }
                  source={require('../../assets/account_lang_check.png')}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={chooseENLanguage}
                style={
                  ENLanguage
                    ? [
                      styles.langNation_Eng,
                      {
                        backgroundColor: 'rgb(210, 230, 255)',
                        borderColor: '#0065FF',
                        borderWidth: 1,
                        borderRadius: 5,
                      },
                    ]
                    : styles.langNation_Eng
                }>
                <View style={styles.row}>
                  <Image
                    source={require('../../assets/account_lang_eng.png')}
                    style={styles.langNationIcon}
                  />

                  <Text style={styles.accountText}>{strings.english}</Text>
                </View>

                <Image
                  style={
                    ENLanguage
                      ? [
                        styles.langSelectNationIcon,
                        {
                          opacity: 1,
                        },
                      ]
                      : styles.langSelectNationIcon
                  }
                  source={require('../../assets/account_lang_check.png')}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.langFooter_ButtonClose}
                onPress={() => {
                  setopenLanguageMenu(false);
                  if (VNLanguage == true) {
                    strings.setLanguage('vn')
                    dispatch(setCurrentLanguage("vn"));
                  }
                  if (ENLanguage == true) {
                    strings.setLanguage('en')
                    dispatch(setCurrentLanguage("en"));
                  }
                }}>
                <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '600' }}>
                  {strings.confirm}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </View>
      {/* cài đặt section */}
      <View style={styles.accountPolicyContainer}>
        <Text style={styles.accountHeading}>{strings.terms_of_use}</Text>

        <TouchableOpacity
          style={styles.accountListItem}
          // onPress={() => showAlert()}
          onPress={() => navigation.navigate('NullDataScreen')}
          >
          <View style={styles.row}>
            <Image
              source={require('../../assets/account_hoidap.png')}
              style={styles.accountListItem_IconTitle}
            />
            <Text style={styles.policy_accountText}>{strings.QuestionAndAnswer}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.accountListItem}
          // onPress={() => showAlert()}
          onPress={() => navigation.navigate('NullDataScreen')}
          >
          <View style={styles.row}>
            <Image
              source={require('../../assets/account_quydinh.png')}
              style={styles.accountListItem_IconTitle}
            />
            <Text style={styles.policy_accountText}>
              {strings.usage_rules_and_policy}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.accountListItem}
          onPress={() => navigation.navigate('NullDataScreen')}>
          <View style={styles.row}>
            <Image
              source={require('../../assets/account_chinhsach.png')}
              style={styles.accountListItem_IconTitle}
            />
            <Text style={styles.policy_accountText}>
              {strings.privacy_policy}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnLogout} onPress={confirmSignout}>
          <Text style={styles.btnLogoutText}>{strings.sign_out}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

