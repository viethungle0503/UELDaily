import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {useState} from 'react';
import styles from './HomeScreenStyles/screen_HomeDisplay_style';
import { strings } from '../Language';

export default function HomeDisplay({navigation}) {
  const [openLanguageMenu, setopenLanguageMenu] = React.useState(false);

  const [VNLanguage, setVNLanguage] = React.useState(true);
  const chooseVNLanguage = () => {
    setVNLanguage(!VNLanguage);
    setENLanguage(!ENLanguage);
  };

  const [ENLanguage, setENLanguage] = React.useState(false);
  const chooseENLanguage = () => {
    setENLanguage(!ENLanguage);
    setVNLanguage(!VNLanguage);
  };

  const news = news_UEL.map((item, index) => (
    <TouchableOpacity
      style={styles.row}
      key={index}
      onPress={() => {
        navigation.navigate('NewsDetail', {link: item.link});
      }}>
      <Image style={styles.hoatdongImage} source={{uri: item.imageURL}} />
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
  ));

  return (
    <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
      {loggedIn && (
        <View style={styles.studentwelcome}>
          <Image
            style={styles.studentAvatar}
            source={{uri: currentUser.data.profileImage}}
          />
          <View>
            {currentUser ? (
              <Text style={styles.studentName}>
                {currentUser.data.lastName + ` ${currentUser.data.firstName}`}
              </Text>
            ) : null}
            <Text>{currentUser.key}</Text>
          </View>

          {/* <TouchableOpacity
            style={styles.btnLanguage}
            onPress={() => setopenLanguageMenu(true)}>

            <MaterialCommunityIcons
              style={styles.svgLanguage}
              name={'web'}
              size={25}
            />

          </TouchableOpacity> */}

          {/* modal chọn ngôn ngữ */}
          <Modal visible={openLanguageMenu} transparent={true}>
            <View
              style={styles.langBackground}>
              <View style={styles.langContainer}>
                <Text style={styles.accountHeading}>Chọn ngôn ngữ</Text>

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
                    <Text style={styles.accountText}>Tiếng Việt</Text>
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

                    <Text style={styles.accountText}>Tiếng Anh</Text>
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
                    if(VNLanguage == true) {
                      strings.setLanguage('vn')
                      console.log("changedVN");
                    }
                    if(ENLanguage == true) {
                      //changeLaguage(en);
                      strings.setLanguage('en')
                      console.log("changedEN");
                    }
                    }}>
                  <Text style={{color: '#FFF', fontSize: 16, fontWeight: '600'}}>
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
            <Text style={{color: 'black', marginLeft: 5}}>Tất cả</Text>
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


