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
  let row = [];
  let prevOpenedRow;
  const closeRow = (index) => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
    prevOpenedRow.close();
  }
  const deleteItem = (index) => {
    Alert.alert(
      "Thông báo",
      "Bạn có muốn xóa thông báo này?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK", onPress: () => {
            closeRow(index);
            setWarningNotices(warningNotices.filter((_, i) => i !== index));
          }, style: "default"
        }
      ],
      {
        cancelable: true,
        userInterfaceStyle: "dark",
      }
    );
  }
  useEffect(() => {
    var trueUser = db_app.find(x => x.data.email == currentUser.email);
    if (trueUser != undefined) {
      var warningNoticesHolder = [...warningNotices];
      trueUser.data.notices.filter(x => x.type == 0).forEach((value) => {
        warningNoticesHolder.push(value);
      })
      var sortedWarningNoticesHolder = [...warningNoticesHolder];
      sortedWarningNoticesHolder.sort((a, b) => (new Date(b.creTime)).getTime() - (new Date(a.creTime)).getTime());
      setWarningNotices(sortedWarningNoticesHolder);
    }
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
          return (
            <Swipeable overshootRight={true} 
            onSwipeableOpen={() => deleteItem(index)} 
            renderRightActions={renderRight}
            ref={ref => row[index] = ref}
            >
              <Animated.View
                style={styles.notiItem}>
                {item.seen ? <></> : <View style={styles.fadeItem}></View>}
                <View style={styles.notiItem_Icon}>
                  <Image source={require('../../assets/notiNhacnho.png')} />
                </View>

                <View style={styles.notiItem_Content}>
                  <Text style={styles.notiItem_Content_Title}>
                    {item.title}
                  </Text>

                  <View style={styles.notiItem_Content_ActionTime}>
                    <TouchableOpacity
                      onPress={() => navigateToHomeWork()}>
                      <Text
                        style={[
                          styles.notiItem_Content_ActionText,
                          {
                            color: '#FF6E35',
                          },
                        ]}>
                        {strings.watch_now}
                      </Text>
                    </TouchableOpacity>

                    <View style={styles.row}>
                      <Image source={require('../../assets/notiHistory.png')} />
                      <Text style={{ color: 'red' }}>&nbsp;{dateDiffInDays(new Date(), new Date(item.creTime))}</Text>
                    </View>

                  </View>

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
              </Animated.View>
            </Swipeable>
          )
        }}
        keyExtractor={(item, index) => (item + index).toString()}
      />
    </SafeAreaView>
  );
}

