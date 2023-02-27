import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
  SafeAreaView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useEffect, useState } from 'react';
import styles from './HomeScreenStyles/screen_HomeDisplay_style';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentLanguage, setLoggedIn } from '../../redux_toolkit/userSlice';
import strings from '../Language';
import { setNews_UEL } from '../../redux_toolkit/newsSlice';
import { loadGraphicCards } from '../GlobalFunction';
import { Alert } from 'react-native';

export default function HomeDisplay({ navigation }) {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user.currentUser);
  const loggedIn = useSelector(state => state.user.loggedIn);
  const profileImage = useSelector(state => state.user.profileImage);
  const currentLanguage = useSelector(state => state.user.currentLanguage);
  const news_UEL = useSelector(state => state.news.news_UEL);
  const [openLanguageMenu, setopenLanguageMenu] = useState(false);
  const [VNLanguage, setVNLanguage] = useState((currentLanguage == "vn") ? true : false);
  const chooseVNLanguage = () => {
    setVNLanguage(!VNLanguage);
    setENLanguage(!ENLanguage);
  };

  const [ENLanguage, setENLanguage] = useState(!VNLanguage);
  const chooseENLanguage = () => {
    setENLanguage(!ENLanguage);
    setVNLanguage(!VNLanguage);
  };
  const renderHeader = () => {
    return (
      <SafeAreaView style={styles.body} showsVerticalScrollIndicator={false}>
        {loggedIn && (
          <View style={styles.studentwelcome}>

            <Image
              style={styles.studentAvatar}
              source={{ uri: profileImage }}
            />
            <View>
              {(currentUser != {}) ? (
                <Text style={styles.studentName}>
                  {currentUser.lastName + ` ${currentUser.firstName}`}
                </Text>
              ) : null}
              <Text>{currentUser.id}</Text>
            </View>

            <TouchableOpacity
              style={styles.btnLanguage}
              onPress={() => setopenLanguageMenu(true)}>

              <MaterialCommunityIcons
                style={styles.svgLanguage}
                name={'web'}
                size={25}
              />

            </TouchableOpacity>


            <Image
              style={styles.effect}
              source={require('../../assets/effectRound.png')}
            />
          </View>
        )}
        <View style={styles.tienich}>
          <View style={styles.tienichHeader}>
            <Text style={styles.tienichText}>{strings.utilities}</Text>
            <TouchableOpacity style={styles.btnAllTienich} 
            onPress={() => {
              Alert.alert("Thông báo","Các tính năng khác cần có để sử dụng tính năng này");
            }}>
              <MaterialCommunityIcons name={'tune-variant'} size={14} style={{color:'black'}}/>
              <Text style={{ color: 'black', marginLeft: 5 }}>{strings.all}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.col}>
            <View style={styles.tienichIcon}>
              <TouchableOpacity
                style={styles.tienichIcon_Item}
                onPress={() => navigation.navigate('Schedule')}>
                <Image
                  style={styles.tienichIcon__ItemImg}
                  source={require('../../assets/tkbIcon.png')}
                />
                <Text style={styles.tienichIcon__ItemText}>{strings.schedule}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.tienichIcon_Item}
                onPress={() => navigation.navigate('ScoreBoard')}>
                <Image
                  style={styles.tienichIcon__ItemImg}
                  source={require('../../assets/xemdiemIcon.png')}
                />
                <Text style={styles.tienichIcon__ItemText}>{strings.scoreboard}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.tienichIcon_Item}
                onPress={() => navigation.navigate('Exam')}>
                <Image
                  style={styles.tienichIcon__ItemImg}
                  source={require('../../assets/lichthiIcon.png')}
                />
                <Text style={styles.tienichIcon__ItemText}>{strings.exam}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.tienichIcon}>
              <TouchableOpacity
                style={styles.tienichIcon_Item}
                onPress={() => navigation.navigate('Homework')}>
                <Image
                  style={styles.tienichIcon__ItemImg}
                  source={require('../../assets/baitapIcon.png')}
                />
                <Text style={styles.tienichIcon__ItemText}>{strings.homework}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.tienichIcon_Item}
                onPress={() => navigation.navigate('Tuition')}>
                <Image
                  style={styles.tienichIcon__ItemImg}
                  source={require('../../assets/hocphiIcon.png')}
                />
                <Text style={styles.tienichIcon__ItemText}>{strings.tuition}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.tienichIcon_Item}
                onPress={() => navigation.navigate('Ctxh')}>
                <Image
                  style={styles.tienichIcon__ItemImg}
                  source={require('../../assets/ctxhIcon.png')}
                />
                <Text style={styles.tienichIcon__ItemText}>{strings.ctxh}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.shape}></View>
        <Text style={styles.hoatdongHeader}>{strings.recent_activity}</Text>
        {/* <View style={styles.hoatdong}>
        </View> */}
      </SafeAreaView>
    )
  }
  if (strings.getInterfaceLanguage().substring(3, 5).toLowerCase() != currentLanguage) {
    strings.setLanguage(currentLanguage);
  };
  useEffect(() => {
    strings.setLanguage(currentLanguage);
    if (currentLanguage == "vn") {
      setVNLanguage(true);
      setENLanguage(false)
    }
    else {
      setVNLanguage(false);
      setENLanguage(true)
    }
  }, [currentLanguage]);
  useEffect(() => {
    if (news_UEL.length == 0) {
      loadGraphicCards("https://uel.edu.vn/tin-tuc").then((returnValue) => {
        dispatch(setNews_UEL(returnValue));
      })
    }
    // dispatch(setLoggedIn(false));
  }, [])
  return (
    <SafeAreaView style={{
      marginBottom: 50
    }}>
      <FlatList  
        keyExtractor={(item, index) => (item + index).toString()}
        showsVerticalScrollIndicator={false}
        data={news_UEL}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.row}
              onPress={() => {
                navigation.navigate('NewsDetail', { link: item.link });
              }}>
              <Image style={styles.hoatdongImage} source={{ uri: item.imageURL }} />
              <View style={styles.contentMain}>
                <Text
                  style={styles.hoatdongTitle}
                  numberOfLines={3}
                  ellipsizeMode="tail">
                  {item.title}
                </Text>
                <View style={styles.timeBlock}>
                  <Image
                    style={styles.iconTime}
                    source={require('../../assets/clock.png')}
                  />
                  <Text style={styles.hoatdongTime}>{item.time.slice(1, 11)}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        }}
        ListHeaderComponent={renderHeader}
      />
      <Modal visible={openLanguageMenu} transparent={true} onRequestClose={() => setopenLanguageMenu(false)}>
        <View
          style={styles.langBackground}>
          <View style={styles.langContainer}>
            <Text style={styles.modalHeading}>{strings.select_language}</Text>
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
              <View style={styles.langNationContainer}>
                <Image
                  source={require('../../assets/account_lang_vie.png')}
                  style={styles.langNationIcon}
                />
                <Text style={styles.modalText}>{strings.vietnamese}</Text>
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
              <View style={styles.langNationContainer}>
                <Image
                  source={require('../../assets/account_lang_eng.png')}
                  style={styles.langNationIcon}
                />

                <Text style={styles.modalText}>{strings.english}</Text>
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
    </SafeAreaView>

  );
}


