import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  Modal,
} from 'react-native';

import React from 'react';
import {useState} from 'react';

import {FlatList} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import MediaNoti from './Media/screen_MediaNoti';
import MediaContact from './Media/screen_MediaContact';

const Tab = createMaterialTopTabNavigator();

export default function Services({navigation}) {
  const [open, setOpen] = React.useState(false);

  async function onDisplayNotification() {
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title:
        '<p style="color: #4caf50;"><b>Styled HTMLTitle</span></p></b></p> &#128576;',
      subtitle: '&#129395;',
      body: 'The <p style="text-decoration: line-through">body can</p> also be <p style="color: #ffffff; background-color: #9c27b0"><i>styled too</i></p> &#127881;!',
      android: {
        channelId,
        // pressAction is needed if you want the notification to open the app when pressed
        actions: [
          {
            title: '<b>Dance</b> &#128111;',
            pressAction: {id: 'dance'},
          },
          {
            title: '<p style="color: #f44336;"><b>Cry</b> &#128557;</p>',
            pressAction: {id: 'cry'},
          },
        ],
      },
    });
  }
  return (
    // <View style={{marginTop :250}}>
    //   <Button title="Display Notification" onPress={() => onDisplayNotification()} />
    // </View>

    <View style={styles.body}>
      <Image
        style={styles.effectLeft}
        source={require('../assets/preLoginEffectLeft.png')}
      />
      <Image
        style={styles.effectRightBottom}
        source={require('../assets/preLoginEffectRightBottom.png')}
      />

      <Modal visible={open} transparent={true}>
        <View style={styles.modalContainer}>
          <Image
            style={styles.modalEffect}
            source={require('../assets/mediaEffect.png')}
          />

          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.modalHeader_btnBackContainer}
              onPress={() => setOpen(false)}>
              <Image
                source={require('../assets/btnBack.png')}
                style={styles.modalHeader_btnBack}
              />
            </TouchableOpacity>

            <Text style={styles.modalHeader_DepartmentName}>
              Phòng Tuyển sinh và CTSV UEL
            </Text>
          </View>

          <Tab.Navigator
            initialRouteName="MediaNoti"
            screenOptions={{
              tabBarActiveTintColor: '#0065FF',
              tabBarInactiveTintColor: 'black',
              tabBarLabelStyle: {
                fontSize: 16,
                fontWeight: 'bold',
                textTransform: 'none',
                // backgroundColor: {Focused ? backgroundColor :"white" : backgroundColor: '#F7F9FE'},
              },
              tabBarStyle: {
                // backgroundColor: '#F7F9FE',
                paddingVertical: 0,
                // paddingHorizontal: 10,
                textTransform: 'capitalize',
              },
              tabBarPressColor: '#0065FF',
            }}>
            <Tab.Screen
              style={styles.notiHeader_Sort_btnActive}
              name="MediaNoti"
              component={MediaNoti}
              options={{
                tabBarLabel: 'Thông báo',
                upperCaseLabel: false,
                headerShown: false,
              }}
            />
            <Tab.Screen
              name="MediaContact"
              component={MediaContact}
              options={{tabBarLabel: 'Liên hệ', headerShown: false}}
            />
          </Tab.Navigator>
        </View>
      </Modal>

      <ScrollView style={{flex: 1}}>
        <Text style={{padding: 20, fontWeight: 'bold', fontSize: 20}}>
          Sự kiện
        </Text>
              {/* First News */}
        <TouchableOpacity
          style={styles.mediaItem}
          onPress={() => setOpen(true)}>
          <Image
            style={styles.mediaItem_Image}
            source={require('../assets/mediaItemImage.png')}></Image>

          <View style={styles.mediaItem_Text}>
            <View style={styles.mediaDepartment}>
              <Text style={styles.mediaDepartmentName}>
                PHÒNG Tuyển sinh và Công tác sinh viên UEL
              </Text>

              <Text style={styles.mediaLastestTime}>9h</Text>
            </View>

            <Text>Danh sách sinh viên được gia hạn đóng học phí</Text>
          </View>
        </TouchableOpacity>
              {/* Second News */}
        <View style={styles.mediaItem}>
          <Image
            style={styles.mediaItem_Image}
            source={require('../assets/mediaItemImage_phonghoptac.png')}></Image>

          <View style={styles.mediaItem_Text}>
            <View style={styles.mediaDepartment}>
              <Text style={styles.mediaDepartmentName}>
                PHÒNG Hợp tác Phát triển UEL
              </Text>

              <Text style={styles.mediaLastestTime}>9h</Text>
            </View>

            <Text>Chương trình Học bổng Chính phủ Australia...</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
  },
  // open item
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    position: 'relative',
  },
  modalEffect: {
    position: 'absolute',
    top: 30,
    right: 0,
    zIndex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  modalHeader_btnBackContainer: {
    width: 25,
  },
  modalHeader_btnBack: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  modalHeader_DepartmentName: {
    fontSize: 19,
    fontWeight: '700',
    color: '#252525',
    paddingHorizontal: 10,
  },
  // open item

  effectLeft: {
    position: 'absolute',
    top: 250,
    left: 0,
  },
  effectRightBottom: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },

  mediaItem: {
    // height: 80,
    flexDirection: 'row',
    // flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginHorizontal: 20,
    marginVertical: 10,
    paddingRight: 10,
  },
  mediaItem_Image: {
    width: 45,
    aspectRatio: 1,
    borderRadius: 100,
    marginRight: 10,
  },
  mediaItem_Text: {
    flexDirection: 'column',
    borderBottomWidth: 2,
    borderColor: '#F0F0F0',
    justifyContent: 'space-between',
    paddingBottom: 25,
    // paddingHorizontal: 10,
  },
  mediaDepartment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  mediaDepartmentName: {
    width: '80%',
    fontWeight: '600',
    fontSize: 16,
  },
});
