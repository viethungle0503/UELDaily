import React, { useEffect, useState } from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Animated,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import styles from './NoticesStyles/screen_UpdateNotices_style'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Swipeable } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { dateDiffInDays } from '../GlobalFunction';
import strings from '../Language';
import { setUnreadNotice } from '../../redux_toolkit/userSlice';
import { useDispatch } from 'react-redux';
import { setSeenTrue, deleteNotification } from '../../redux_toolkit/databaseSlice';
import NullDataScreen from '../../components/nullDataScreen';
import { firebase } from '@react-native-firebase/database';
const renderRight = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [-50, 0.5],
    outputRange: [1, 0.1]
  });
  const Style = {
    transform: [
      {
        scale
      }
    ]
  };
  return (
    <View
      style={{
        width: 80,
        height: '100%',

        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,

        marginBottom: 20,
      }}>
      <Animated.Text style={[Style, {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 10,
      }]}>
        Xóa
      </Animated.Text>
    </View>
  )
};

export default function UpdateNotices({ navigation }) {
  const db_app = useSelector(state => state.database.db_app);
  const currentUser = useSelector(state => state.user.currentUser);
  const currentLanguage = useSelector(state => state.user.currentLanguage);
  const [openModalUpdateNoti, setopenModalUpdateNoti] = useState(false);
  const [modalData, setModalData] = useState();
  const [updateNotices, setUpdateNotices] = useState([]);
  const unreadNotice = useSelector(state => state.user.unreadNotice);
  const dispatch = useDispatch();
  let row = [];
  let prevOpenedRow;
  const closeRow = (index) => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
    prevOpenedRow.close();
  }
  useEffect(() => {
    // if (updateNotices.length == 0) {
    var trueUser = db_app.find(
      x => x.data.email == currentUser.email,
    );
    if (trueUser != undefined) {
      var updateNoticesHolder = [];
      trueUser.data.notices
        .filter(x => x?.type == 1)
        .forEach(value => {
          updateNoticesHolder.push(value);
        });
      var sortedUpdateNoticesHolder = [...updateNoticesHolder];
      sortedUpdateNoticesHolder.sort((a, b) => (new Date(b.creTime)).getTime() - (new Date(a.creTime)).getTime());
      setUpdateNotices(sortedUpdateNoticesHolder);
    }
    // }
  }, [db_app]);

  useEffect(() => {
  }, [currentLanguage, updateNotices])
  return (
    <SafeAreaView style={styles.body}>
      {(updateNotices.length == 0) ? (<NullDataScreen />) : (
        <>
      <Modal
        animationType='slide'
        transparent={true}
        visible={openModalUpdateNoti}
        onRequestClose={() => setopenModalUpdateNoti(false)}
      >
        <View style={styles.modalContainer}>
          {/* 2 effect */}
          <Image
            style={styles.modalEffectLeft}
            source={require('../../assets/preLoginEffectLeft.png')}
          />
          <Image
            style={styles.modalEffectRight}
            source={require('../../assets/preLoginEffectRightBottom.png')}
          />
          {/* 2 effect */}

          <TouchableOpacity
            style={styles.btnBackContainer}
            onPress={() => setopenModalUpdateNoti(false)}
          >
            <MaterialCommunityIcons
              name={'keyboard-backspace'}
              size={30}
              color={'#000'}
            />
          </TouchableOpacity>
          {modalData}
        </View>
      </Modal>
      <FlatList
        style={styles.noti}
        showsVerticalScrollIndicator={false}
        data={updateNotices}
        renderItem={({ item, index }) => {
          let firstIndex = db_app.findIndex(x => x.data.email == currentUser.email);
          let secondIndex = db_app[firstIndex]?.data?.notices?.findIndex(x => x?.id == item.id);
          function settingModal() {
            const title = (() => (
              <ScrollView>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalHeader_TitleText}>
                    {item.title}
                  </Text>
                  <View style={styles.modalHeader_Department}>
                    <Image
                      style={styles.modalHeader_Icon}
                      source={require('../../assets/component_ModalUpdateNoti_Icon.png')} />
                    <View>
                      <Text style={styles.modalHeader_DepartmentName}>
                        {item.sendBy}
                      </Text>
                      <Text style={styles.modalHeader_DepartmentMail}>
                        {(item.senderEmail != null) ? item.senderEmail : strings.no_corresponding_data}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.modalContent}>
                  <Text style={styles.modalContentText}>
                    {item.content}

                  </Text>
                </View>


                <TouchableOpacity style={styles.btnResponse} 
                onPress={() => {
                  Alert.alert(
                    "Thông báo",
                    "Tính năng này vẫn trong giai đoạn phát triển. Mong bạn quay lại sau",
                    [
                      {
                        text: "Cancel",
                        onPress: () => {},
                        style: "cancel",
                      },
                      {
                        text: "OK", onPress: () => {}, style: "default"
                      }
                    ],
                    {
                      cancelable: true,
                      userInterfaceStyle: "dark",
                    }
                  );
                }}>
                  <Text style={styles.btnResponseText}>{strings.answer}</Text>
                </TouchableOpacity>

              </ScrollView>

            ));
            setModalData(title);
          };
          const deleteItem = (index) => {
            const asyncDelete = async () => {
              await firebase
                .app()
                .database(
                  'https://ueldaily-hubing-default-rtdb.asia-southeast1.firebasedatabase.app/',
                )
                .ref(`/users`)
                .once(
                  'value',
                  async (snapshot) => {
                    snapshot.forEach(async (childSnapshot) => {
                      let userKey = childSnapshot?.child('id').val()
                      if (userKey == currentUser.id) {
                        let needToDelete = childSnapshot.child('notices').val().findIndex(x => x?.id == item.id);
                        if (needToDelete != -1) {
                          await firebase
                            .app()
                            .database(
                              'https://ueldaily-hubing-default-rtdb.asia-southeast1.firebasedatabase.app/',
                            )
                            .ref(`/users/${childSnapshot.key}/notices/${needToDelete}`).remove(() => {
                              // console.log('Operation Complete');
                            });
                        }
                      }
                    })
                  },
                  error => {
                    console.error(error);
                  },
                );
            }

            Alert.alert(
              "Thông báo",
              "Bạn có muốn xóa thông báo này?",
              [
                {
                  text: "Cancel",
                  onPress: () => {
                    closeRow(index);
                  },
                  style: "cancel",
                },
                {
                  text: "OK", onPress: () => {
                    asyncDelete();
                    closeRow(index);
                    if(item.seen == false) {
                      dispatch(setUnreadNotice(unreadNotice - 1));
                    };
                    // setUpdateNotices(updateNotices.filter((_, i) => i !== index));
                    dispatch(deleteNotification([firstIndex,item.id]));
                  }, style: "default"
                }
              ],
              {
                cancelable: true,
                userInterfaceStyle: "dark",
              }
            );
          };
          const updateSeen = async () => {
            await firebase
              .app()
              .database(
                'https://ueldaily-hubing-default-rtdb.asia-southeast1.firebasedatabase.app/',
              )
              .ref(`/users`)
              .once(
                'value',
                async (snapshot) => {
                  snapshot.forEach(async (childSnapshot) => {
                    let userKey = childSnapshot?.child('id').val()
                    if (userKey == currentUser.id) {
                      let needToUpdate = childSnapshot.child('notices').val().findIndex(x => x?.id == item.id);
                      if (needToUpdate != -1) {
                        await firebase
                          .app()
                          .database(
                            'https://ueldaily-hubing-default-rtdb.asia-southeast1.firebasedatabase.app/',
                          )
                          .ref(`/users/${childSnapshot.key}/notices/${needToUpdate}`).update({
                            seen: true,
                          })
                          // .then(() => console.log('Data updated.'));
                      }
                    }
                  })
                },
                error => {
                  console.error(error);
                },
              );
          };
          return (
            <Swipeable overshootRight={true} onSwipeableOpen={() => deleteItem(index)}
              renderRightActions={renderRight}
              ref={ref => row[index] = ref}
            >
              <Animated.View>
                <TouchableOpacity style={styles.notiItem}
                  onPress={() => {
                    updateSeen();
                    settingModal();
                    setopenModalUpdateNoti(true);
                    if (!item.seen) {
                      
                      dispatch(setSeenTrue([firstIndex, secondIndex]));
                      dispatch(setUnreadNotice(unreadNotice - 1));
                    };
                  }}>
                  {item.seen ? <View style={styles.fadeItem}></View> : <></>}
                  <View style={styles.notiItem_Icon}>
                    <Image source={require('../../assets/notiCapnhat.png')} />
                  </View>
                  <View style={styles.notiItem_Content}>
                    <Text
                      style={styles.notiItem_Content_Title}
                      numberOfLines={2}
                      ellipsizeMode="tail">
                      {item.title}
                    </Text>
                    <Text
                      style={styles.notiItem_Content_Describe}
                      numberOfLines={2}
                      ellipsizeMode="tail">
                      {item.content}
                    </Text>
                    <SafeAreaView style={styles.notiItem_Content_ActionTime}>
                      <Text
                        style={[
                          {
                            color: '#0065FF',
                          },
                        ]}>
                        {item.sendBy}
                      </Text>
                      <View style={styles.row}>
                        <Image source={require('../../assets/notiHistory.png')} />
                        <Text style={{ color: 'red' }}>&nbsp;{dateDiffInDays(new Date(), new Date(item.creTime))}</Text>
                      </View>

                    </SafeAreaView>
                  </View>
                  <View style={styles.notiItem_Status}>
                    <View
                      style={[
                        styles.notiItem_Status_ReadIcon,
                        {
                          backgroundColor: item.seen ? '#ffffff' : '#0065FF',
                        },
                      ]}></View>

                  </View>
                </TouchableOpacity>
              </Animated.View>
            </Swipeable>

          );
        }}
        keyExtractor={(item, index) => (item + index).toString()}
      />
      </>
      )}
    </SafeAreaView>
  );
}

