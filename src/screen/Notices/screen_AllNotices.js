import {useEffect, useState} from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  Animated,
  FlatList,
  SafeAreaView,
  Alert,
  ScrollView,
  Modal,
} from 'react-native';
import strings from '../Language';
import styles from './NoticesStyles/screen_AllNotices_style';
import {Swipeable} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import {dateDiffInDays} from '../GlobalFunction';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {setUnreadNotice} from '../../redux_toolkit/userSlice';
import {
  setSeenTrue,
  deleteNotification,
} from '../../redux_toolkit/databaseSlice';
import NullDataScreen from '../../components/nullDataScreen';
import {firebase} from '@react-native-firebase/database';
import {sendEmail} from '../../SendEmailService';
const renderRight = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [-50, 0.5],
    outputRange: [1, 0.1],
  });
  const Style = {
    transform: [
      {
        scale,
      },
    ],
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
      <Animated.Text
        style={[
          Style,
          {
            color: '#FFF',
            fontWeight: 'bold',
            fontSize: 10,
          },
        ]}>
        Xóa
      </Animated.Text>
    </View>
  );
};
const dateSort = function (a, b) {
  // var destinationDay = (new Date("2050-12-31T01:30:50.000-07:00")).getTime()
  // var c = (new Date(a.creTime)).getTime();
  // var d = (new Date(b.creTime)).getTime();
  return new Date(b.creTime).getTime() - new Date(a.creTime).getTime();
  // if(c.getFullYear() < d.getFullYear()) return -1;
  // else if(c.getFullYear() > d.getFullYear()) return 1;
  // else {
  //   if((c.getMonth + 1) < (d.getMonth + 1)) return -1;
  //   else if((c.getMonth + 1) > (d.getMonth + 1)) return 1;
  //   else {
  //     if((c.getDate()) < (d.getDate())) return -1;
  //     else if((c.getDate()) > (d.getDate())) return 1;
  //     else {
  //       if((c.getHours()) < (d.getHours())) return -1;
  //       else if((c.getHours()) > (d.getHours())) return 1;
  //       else {
  //         if((c.getMinutes()) < (d.getMinutes())) return -1;
  //         else if((c.getMinutes()) > (d.getMinutes())) return 1;
  //         else return 0;
  //       }
  //     }
  //   }
  // }
};

export default function Information({navigation, route}) {
  const [allNotices, setAllNotices] = useState([]);
  const db_app = useSelector(state => state.database.db_app);
  const currentUser = useSelector(state => state.user.currentUser);
  const profileImage = useSelector(state => state.user.profileImage);
  const currentLanguage = useSelector(state => state.user.currentLanguage);
  const [openModalUpdateNoti, setopenModalUpdateNoti] = useState(false);
  const [modalData, setModalData] = useState();
  const unreadNotice = useSelector(state => state.user.unreadNotice);
  const dispatch = useDispatch();
  let row = [];
  let prevOpenedRow;
  const closeRow = index => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
    prevOpenedRow.close();
  };
  useEffect(() => {
    // if (allNotices.length == 0) {
    var trueUser = db_app.find(x => x.data.email == currentUser.email);
    if (trueUser != undefined) {
      var allNoticesHolder = [];
      trueUser.data.notices.forEach(value => {
        if (value != null) {
          allNoticesHolder.push(value);
        }
      });
      var sortedAllNoticeHolder = [...allNoticesHolder];
      sortedAllNoticeHolder.sort(dateSort);
      setAllNotices(sortedAllNoticeHolder);
    }
    // }
  }, [db_app]);
  return (
    <SafeAreaView style={styles.body}>
      {allNotices.length == 0 ? (
        <NullDataScreen />
      ) : (
        <>
          <FlatList
            style={styles.noti}
            showsVerticalScrollIndicator={false}
            data={allNotices}
            renderItem={({item, index}) => {
              let firstIndex = db_app.findIndex(
                x => x.data.email == currentUser.email,
              );
              let secondIndex = db_app[firstIndex]?.data?.notices?.findIndex(
                x => x?.id == item.id,
              );
              const deleteItem = async index => {
                const asyncDelete = async () => {
                  await firebase
                    .app()
                    .database(
                      'https://ueldaily-hubing-default-rtdb.asia-southeast1.firebasedatabase.app/',
                    )
                    .ref(`/users`)
                    .once(
                      'value',
                      async snapshot => {
                        snapshot.forEach(async childSnapshot => {
                          let userKey = childSnapshot?.child('id').val();
                          if (userKey == currentUser.id) {
                            let needToDelete = childSnapshot
                              .child('notices')
                              .val()
                              .findIndex(x => x?.id == item.id);
                            if (needToDelete != -1) {
                              await firebase
                                .app()
                                .database(
                                  'https://ueldaily-hubing-default-rtdb.asia-southeast1.firebasedatabase.app/',
                                )
                                .ref(
                                  `/users/${childSnapshot.key}/notices/${needToDelete}`,
                                )
                                .remove(() => {
                                  // console.log('Operation Complete');
                                });
                            }
                          }
                        });
                      },
                      error => {
                        console.error(error);
                      },
                    );
                };
                Alert.alert(
                  'Thông báo',
                  'Bạn có muốn xóa thông báo này?',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => {
                        closeRow(index);
                      },
                      style: 'cancel',
                    },
                    {
                      text: 'OK',
                      onPress: () => {
                        asyncDelete();
                        closeRow(index);
                        // setAllNotices(allNotices.filter((_, i) => i !== index));
                        if (item.seen == false) {
                          dispatch(setUnreadNotice(unreadNotice - 1));
                        }
                        dispatch(deleteNotification([firstIndex, item.id]));
                      },
                      style: 'default',
                    },
                  ],
                  {
                    cancelable: true,
                    userInterfaceStyle: 'dark',
                  },
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
                    async snapshot => {
                      snapshot.forEach(async childSnapshot => {
                        let userKey = childSnapshot?.child('id').val();
                        if (userKey == currentUser.id) {
                          let needToUpdate = childSnapshot
                            .child('notices')
                            .val()
                            .findIndex(x => x?.id == item.id);
                          if (needToUpdate != -1) {
                            await firebase
                              .app()
                              .database(
                                'https://ueldaily-hubing-default-rtdb.asia-southeast1.firebasedatabase.app/',
                              )
                              .ref(
                                `/users/${childSnapshot.key}/notices/${needToUpdate}`,
                              )
                              .update({
                                seen: true,
                              });
                            // .then(() => console.log('Data updated.'));
                          }
                        }
                      });
                    },
                    error => {
                      console.error(error);
                    },
                  );
              };
              function settingModal() {
                const title = () => (
                  <ScrollView>
                    <View style={styles.modalHeader}>
                      <Text style={styles.modalHeader_TitleText}>
                        {item.title}
                      </Text>
                    </View>

                    <View style={styles.responseItem}>
                      <View style={styles.modalHeader_Department}>
                        <Image
                          style={styles.modalHeader_Icon}
                          source={require('../../assets/component_ModalUpdateNoti_Icon.png')}
                        />
                        <View style={styles.row}>
                          <View>
                            <Text style={styles.modalHeader_DepartmentName}>
                              {item.sendBy}
                            </Text>
                            {/* <Text style={styles.modalHeader_DepartmentMail}>
                              {(item.senderEmail != null) ? item.senderEmail : strings.no_corresponding_data}
                            </Text> */}
                            <Text style={styles.modalHeader_DepartmentMail}>
                              Đến: {currentUser.email}
                            </Text>
                          </View>

                          <TouchableOpacity
                            style={styles.btnResponseEmail}
                            onPress={() => {
                              Alert.alert('Chức năng đang phát triển');
                              // sendEmail(
                              //   `younghungold@gmail.com`,
                              //   `This a test message from our app. Just ignore it`,
                              //   `Hey, we need 2 minutes of your time to fill this quick survey [link]`,
                              //   {
                              //     cc: `huyenntp20406c@st.uel.edu.vn; ngocptb20406c@st.uel.edu.vn; ngannst20406c@st.uel.edu.vn;binhtt20406c@st.uel.edu.vn;hunglv20406c@st.uel.edu.vn`,
                              //   },
                              // ).then(() => {
                              //   console.log(
                              //     'Your message was successfully sent!',
                              //   );
                              // });
                            }}>
                            <Image
                              style={styles.btnResponseEmail}
                              source={require('../../assets/btnReplyEmail.png')}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View style={styles.modalContent}>
                        <Text style={styles.modalContentText}>
                          {item.content}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.responseItem}>
                      <View style={styles.modalHeader_Department}>
                        <Image
                          style={styles.userAvatar}
                          source={{uri: profileImage}}
                        />

                        <View>
                          <Text style={styles.modalHeader_DepartmentName}>
                            {currentUser.lastName + ' ' + currentUser.firstName}
                          </Text>

                          <Text style={styles.modalHeader_DepartmentMail}>
                            Đến:{' '}
                            {item.senderEmail != null
                              ? item.senderEmail
                              : strings.no_corresponding_data}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.modalContent}>
                        <Text style={styles.modalContentText}>
                          {item.content}
                        </Text>
                      </View>
                    </View>

                    {/* <TouchableOpacity style={styles.btnResponse} 
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
                    </TouchableOpacity> */}
                  </ScrollView>
                );
                setModalData(title);
              }
              return (
                <Swipeable
                  overshootRight={true}
                  onSwipeableOpen={() => deleteItem(index)}
                  renderRightActions={renderRight}
                  ref={ref => (row[index] = ref)}>
                  <Animated.View>
                    <TouchableOpacity
                      style={styles.notiItem}
                      onPress={
                        item.type == 1
                          ? () => {
                              settingModal();
                              setopenModalUpdateNoti(true);
                              if (!item.seen) {
                                updateSeen();
                                // setAllNotices(prevState => {
                                //   let i = 0;
                                //   const newState = prevState.map(obj => {
                                //     if (i == index) {
                                //       return { ...obj, seen: true };
                                //     }
                                //     i++;
                                //     return obj;
                                //   });
                                //   return newState;
                                // });
                                dispatch(
                                  setSeenTrue([firstIndex, secondIndex]),
                                );
                                dispatch(setUnreadNotice(unreadNotice - 1));
                              }
                            }
                          : () => {
                              switch (item?.redirectType) {
                                case '1':
                                  navigation.navigate('Schedule', {
                                    initBy: route.name,
                                  });
                                  break;
                                case '2':
                                  navigation.navigate('ScoreBoard', {
                                    initBy: route.name,
                                  });
                                  break;
                                case '3':
                                  navigation.navigate('Exam', {
                                    initBy: route.name,
                                  });
                                  break;
                                case '4':
                                  navigation.navigate('Homework', {
                                    initBy: route.name,
                                  });
                                  break;
                                case '5':
                                  navigation.navigate('Tuition', {
                                    initBy: route.name,
                                  });
                                  break;
                                case '6':
                                  navigation.navigate('Ctxh', {
                                    initBy: route.name,
                                  });
                                  break;
                                default:
                                  navigation.navigate('Homework', {
                                    initBy: route.name,
                                  });
                              }
                              if (!item.seen) {
                                updateSeen();
                                dispatch(
                                  setSeenTrue([firstIndex, secondIndex]),
                                );
                                dispatch(setUnreadNotice(unreadNotice - 1));
                              }
                            }
                      }>
                      {!item.seen ? (
                        <></>
                      ) : (
                        <View style={styles.fadeItem}></View>
                      )}
                      <View style={styles.notiItem_Icon}>
                        {item.type == 0 ? (
                          <Image
                            source={require('../../assets/notiNhacnho.png')}
                          />
                        ) : (
                          <Image
                            source={require('../../assets/notiCapnhat.png')}
                          />
                        )}
                      </View>
                      <View style={styles.notiItem_Content}>
                        <Text
                          numberOfLines={2}
                          ellipsizeMode="tail"
                          style={styles.notiItem_Content_Title}>
                          {item.title}
                        </Text>
                        <SafeAreaView
                          style={styles.notiItem_Content_ActionTime}>
                          <Text
                            style={[
                              {
                                color: item.type == 0 ? '#FF6E35' : '#0065FF',
                              },
                            ]}>
                            {strings.watch_now}
                          </Text>
                          <View style={styles.row}>
                            <Image
                              source={require('../../assets/notiHistory.png')}
                            />
                            <Text style={{color: 'red'}}>
                              &nbsp;
                              {dateDiffInDays(
                                new Date(),
                                new Date(item.creTime),
                              )}
                            </Text>
                          </View>
                        </SafeAreaView>
                      </View>

                      <View style={styles.notiItem_Status}>
                        <View
                          style={[
                            styles.notiItem_Status_ReadIcon,
                            {
                              backgroundColor: !item.seen
                                ? item.type == 0
                                  ? '#FF6E35'
                                  : '#0065FF'
                                : '#ffffff',
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
          <Modal
            animationType="slide"
            transparent={true}
            visible={openModalUpdateNoti}
            onRequestClose={() => setopenModalUpdateNoti(false)}>
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
                onPress={() => setopenModalUpdateNoti(false)}>
                <MaterialCommunityIcons
                  name={'keyboard-backspace'}
                  size={30}
                  color={'#000'}
                />
              </TouchableOpacity>
              {modalData}
            </View>
          </Modal>
        </>
      )}
    </SafeAreaView>
  );
}
