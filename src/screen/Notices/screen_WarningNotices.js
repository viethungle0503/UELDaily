import { useEffect, useState } from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Animated,
  FlatList,
  SafeAreaView
} from 'react-native';
import styles from './NoticesStyles/screen_WarningNotices_style';
import { useSelector } from 'react-redux';
import { dateDiffInDays } from '../GlobalFunction';
import { Swipeable } from 'react-native-gesture-handler';
import strings from '../Language';
import { setUnreadNotice } from '../../redux_toolkit/userSlice';
import { useDispatch } from 'react-redux';
import { setSeenTrue, deleteNotification } from '../../redux_toolkit/databaseSlice';

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

export default function WarningNotices({ navigation, route }) {
  const db_app = useSelector(state => state.database.db_app);
  const currentLanguage = useSelector(state => state.user.currentLanguage);
  const currentUser = useSelector(state => state.user.currentUser);
  const [warningNotices, setWarningNotices] = useState([]);
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
    // if (warningNotices.length == 0) {
    var trueUser = db_app.find(x => x.data.email == currentUser.email);
    if (trueUser != undefined) {
      var warningNoticesHolder = [];
      trueUser.data.notices.filter(x => x.type == 0).forEach((value) => {
        warningNoticesHolder.push(value);
      })
      var sortedWarningNoticesHolder = [...warningNoticesHolder];
      sortedWarningNoticesHolder.sort((a, b) => (new Date(b.creTime)).getTime() - (new Date(a.creTime)).getTime());
      setWarningNotices(sortedWarningNoticesHolder);
    }
    // }
  }, [db_app]);
  useEffect(() => {
  }, [currentLanguage, warningNotices])
  function navigateToHomeWork() {
    navigation.navigate('Homework', { initBy: route.name })
  }
  return (
    <SafeAreaView style={styles.body}>
      <FlatList
        style={styles.noti}
        showsVerticalScrollIndicator={false}
        data={warningNotices}
        renderItem={({ item, index }) => {
          let firstIndex = db_app.findIndex(x => x.data.email == currentUser.email);
          let secondIndex = db_app[firstIndex]?.data?.notices?.findIndex(x => x.id == item.id);
          const deleteItem = (index) => {
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
                    closeRow(index);
                    if(item.seen == false) {
                      dispatch(setUnreadNotice(unreadNotice - 1));
                    };
                    // setWarningNotices(warningNotices.filter((_, i) => i !== index));
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
          return (
            <Swipeable overshootRight={true}
              onSwipeableOpen={() => deleteItem(index)}
              renderRightActions={renderRight}
              ref={ref => row[index] = ref}
            >
              <Animated.View
              >
                <TouchableOpacity
                  style={styles.notiItem}
                  onPress={() => {
                    navigateToHomeWork();
                    if (!item.seen) {
                      dispatch(setSeenTrue([firstIndex, secondIndex]));
                      dispatch(setUnreadNotice(unreadNotice - 1));
                    };
                  }}>
                  {item.seen ? <View style={styles.fadeItem}></View> : <></>}
                  <View style={styles.notiItem_Icon}>
                    <Image source={require('../../assets/notiNhacnho.png')} />
                  </View>

                  <View style={styles.notiItem_Content}>
                    <Text style={styles.notiItem_Content_Title}>
                      {item.title}
                    </Text>

                    <SafeAreaView style={styles.notiItem_Content_ActionTime}>
                      <Text
                        style={[
                          styles.notiItem_Content_ActionText,
                          {
                            color: '#FF6E35',
                          },
                        ]}>
                        {strings.watch_now}
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
                          backgroundColor: item.seen ? '#FF6E35' : '#ffffff',
                        },
                      ]}></View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            </Swipeable>
          )
        }}
        keyExtractor={(item, index) => (item + index).toString()}
      />
    </SafeAreaView>
  );
}

