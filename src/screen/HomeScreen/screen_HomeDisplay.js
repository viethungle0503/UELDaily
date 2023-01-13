import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,

} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { render, WebView } from 'react-native-webview';

import React from 'react';
import { useState } from 'react';

export default function HomeDisplay({ navigation }) {
  var RNFS = require('react-native-fs');
  database_departments.forEach((item) => {
    RNFS.existsAssets("departments/" + item.data.logoUrl).then((status) => {
      if (status) {
        global.departmentLogo.push(item.data.logoUrl);
      }
    })
  })
  const [openLanguage, setOpenLanguage] = useState(false);

  const [selectLanguageVie, setselectLanguageVie] = useState(false);
  const clickLanguageVie = () => {
    // selectLanguageEng ? 
    setselectLanguageVie(!selectLanguageVie);
  };

  const [selectLanguageEng, setselectLanguageEng] = useState(false);
  const clickLanguageEng = () => {
    setselectLanguageEng(!selectLanguageEng);
  };


  const news = news_UEL.map((item, index) => (
    <TouchableOpacity
      style={styles.row}
      key={index}
      onPress={() => {
        navigation.navigate('NewsDetail', { link: item.link });
      }}>
      <Image style={styles.hoatdongImage} source={{ uri: item.imageURL }} />
      <View style={styles.contentMain}>
        <Text style={styles.hoatdongTitle}>{item.title}</Text>
        <View style={styles.timeBlock}>
          <Image source={require('../../assets/clock.png')} />
          <Text style={styles.hoatdongTime}>{item.time.slice(1, 11)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  ));

  return (
    <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
      {loggedIn && (
        <View style={styles.studentwelcome}>
          <Image
            style={styles.studentAvatar}
            source={{ uri: currentUser.data.profileImage }}
          />
          <View>
            {currentUser ? (
              <Text style={styles.studentName}>
                {currentUser.data.lastName + ` ${currentUser.data.firstName}`}
              </Text>
            ) : null}
            <Text>{currentUser.key}</Text>
          </View>

          <TouchableOpacity
            style={styles.btnLanguage}
            onPress={() => {
              setOpenLanguage(true)
            }}>
            <MaterialCommunityIcons
              style={styles.svgLanguage}
              name={'web'}
              size={25}
            />
          </TouchableOpacity>

          {/* modal chọn ngôn ngữ */}
          <Modal
            visible={openLanguage}
            transparent={true}>

            <View style={styles.langBackground} >

              <View style={styles.langContainer}>

                <Text style={styles.accountHeading}>Chọn ngôn ngữ</Text>

                <TouchableOpacity
                  onPressIn={clickLanguageVie}
                  style={selectLanguageVie ?
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
                      source={require('../../assets/account_lang_vie.png')}
                      style={styles.langNationIcon}
                    />

                    <Text style={styles.accountText}>Tiếng Việt</Text>

                  </View>
                  <Image
                    style={selectLanguageVie ?
                      styles.langSelectNationIcon :
                      [styles.langSelectNationIcon,
                      {
                        opacity: 1,
                      }
                      ]}
                    source={require('../../assets/account_lang_check.png')}

                  />

                </TouchableOpacity>

                <TouchableOpacity
                  onPressIn={clickLanguageEng}
                  style={selectLanguageEng ?
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
                      source={require('../../assets/account_lang_eng.png')}
                      style={styles.langNationIcon}
                    />

                    <Text style={styles.accountText}>Tiếng Anh</Text>

                  </View>

                  <Image
                    style={selectLanguageEng ?
                      styles.langSelectNationIcon :
                      [styles.langSelectNationIcon,
                      {
                        opacity: 1,
                      }
                      ]}
                    source={require('../../assets/account_lang_check.png')}

                  />


                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.langFooter_ButtonClose}
                  onPress={() => setOpenLanguage(false)}>
                  <Text
                    style={{ color: '#FFF', fontSize: 16, fontWeight: '600' }}>
                    Xác nhận
                  </Text>
                </TouchableOpacity>

              </View>
            </View>

          </Modal>

          {/* modal chọn ngôn ngữ */}
        </View>
      )}
      <Image
        style={styles.effect}
        source={require('../../assets/effectRound.png')}
      />
      <View style={styles.tienich}>
        <View style={styles.tienichHeader}>
          <Text style={styles.tienichText}>Tiện ích</Text>
          <TouchableOpacity style={styles.btnAllTienich}>
            <MaterialCommunityIcons name={'tune-variant'} size={12} />
            <Text style={{ color: 'black', marginLeft: 5 }}>Tất cả</Text>
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
              <Text style={styles.tienichIcon__ItemText}>Thời khóa biểu</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tienichIcon_Item}
              onPress={() => navigation.navigate('ScoreBoard')}>
              <Image
                style={styles.tienichIcon__ItemImg}
                source={require('../../assets/xemdiemIcon.png')}
              />
              <Text style={styles.tienichIcon__ItemText}>Xem điểm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tienichIcon_Item}
              onPress={() => navigation.navigate('Exam')}>
              <Image
                style={styles.tienichIcon__ItemImg}
                source={require('../../assets/lichthiIcon.png')}
              />
              <Text style={styles.tienichIcon__ItemText}>Lịch thi</Text>
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
              <Text style={styles.tienichIcon__ItemText}>Bài tập</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tienichIcon_Item}
              onPress={() => navigation.navigate('Tuition')}>
              <Image
                style={styles.tienichIcon__ItemImg}
                source={require('../../assets/hocphiIcon.png')}
              />
              <Text style={styles.tienichIcon__ItemText}>Học phí</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tienichIcon_Item}
              onPress={() => navigation.navigate('Ctxh')}>
              <Image
                style={styles.tienichIcon__ItemImg}
                source={require('../../assets/ctxhIcon.png')}
              />
              <Text style={styles.tienichIcon__ItemText}>Ngày CTXH</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.shape}></View>

      <View>
        <Text style={styles.hoatdongHeader}>Hoạt động gần đây</Text>
        <View style={styles.hoatdong}>{news}</View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 50,
  },

  col: {
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  timeBlock: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'flex-start',
    marginTop: 5,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'flex-start',
    marginTop: 12,
  },

  studentwelcome: {
    height: 140,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    zIndex: 1,
    padding: 30,
    position: 'relative',
    backgroundColor: '#D0E0FF',
  },
  studentName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#252525',
  },
  studentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 100,
    marginRight: 10,
  },
  btnLanguage: {
    // backgroundColor: 'red',
    position: 'absolute',
    right: 30,
    top: 35,
    zIndex: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    borderColor: '#D9D9D9',
    backgroundColor: '#fff',
  },
  svgLanguage: {
    color: 'black',
  },
  effect: {
    position: 'absolute',
    right: 0,
    top: 0,

    zIndex: 2,
  },

  tienich: {
    flex: 2,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 32,
    paddingBottom: 20,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
    zIndex: 3,
    marginTop: -50,
  },
  tienichHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tienichIcon__ItemImg: {
    height: 32,
    width: 32,
  },
  tienichIcon: {
    display: 'flex',
    flexDirection: 'row',
    // marginHorizontal: 10,
    // justifyContent: 'center',
    marginVertical: 15,
    // marginHorizontal: 5,
    marginBottom: 0,
    // width: 100,
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  tienichIcon_Item: {
    display: 'flex',
    // justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
  tienichIcon__Item: {
    // display: 'flex',
  },
  tienichIcon__ItemIcon: {
    display: 'flex',
    justifyContent: 'center',
    // width: '100%',
    textAlignVertical: 'center',
  },
  tienichIcon__ItemText: {
    fontSize: 18,
    textAlign: 'center',
    // flexWrap: 'wrap',
    textAlignVertical: 'top',
    color: '#000000',
  },
  btnAllTienich: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    borderColor: '#D9D9D9',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,

    display: 'flex',
    // flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tienichText: {
    // color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#252525',
  },

  hoatdong: {
    flex: 4,
    backgroundColor: '#FFF',
    // marginTop: 10,
    // paddingTop: 30,
    paddingHorizontal: 32,
    paddingBottom: 30,
  },

  shape: {
    height: 8,
  },
  hoatdongHeader: {
    // display: block,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#252525',
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: 'white',
  },
  hoatdongTitle: {
    display: 'flex',
    fontSize: 15,
    fontWeight: '500',
    color: '#252525',
    marginRight: 32,
    textAlign: 'justify',
  },
  contentMain: {
    paddingRight: 32,
    marginRight: 52,
  },
  hoatdongTime: {
    marginLeft: 5,
    color: 'red'
  },
  hoatdongImage: {
    width: 110,
    height: 75,
    borderRadius: 4,
    marginRight: 10, //cách hình
  },
});
