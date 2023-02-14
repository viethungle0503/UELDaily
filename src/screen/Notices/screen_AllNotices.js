import { useEffect, useState } from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  Animated,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import strings from '../Language';
import styles from './NoticesStyles/screen_AllNotices_style'
import { Swipeable,RectButton } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { dateDiffInDays } from '../GlobalFunction';
import { useRef } from 'react';

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
      }}
    >
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
const dateSort = function (a, b) {
  // var destinationDay = (new Date("2050-12-31T01:30:50.000-07:00")).getTime()
  // var c = (new Date(a.creTime)).getTime();
  // var d = (new Date(b.creTime)).getTime();
  return (new Date(b.creTime)).getTime() - (new Date(a.creTime)).getTime();
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

}

export default function Information({ navigation, route }) {
  const [allNotices, setAllNotices] = useState([]);
  const db_app = useSelector(state => state.database.db_app);
  const currentUser = useSelector(state => state.user.currentUser);
  const currentLanguage = useSelector(state => state.user.currentLanguage);
  const swipeableRef = useRef(null);
  const deleteItem = (index) => {
    Alert.alert(
      "Thông báo",
      "Bạn có muốn xóa thông báo này?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: () => {
          setAllNotices(allNotices.filter((_, i) => i !== index));
        }, style: "default" }
      ],
      {
        cancelable: true,
        userInterfaceStyle: "dark",
      }
    );
  }
  useEffect(() => {
    if (allNotices.length == 0) {
      var trueUser = db_app.find(
        x => x.data.email == currentUser.email,
      );
      if (trueUser != undefined) {
        var allNoticesHolder = [...allNotices];
        trueUser.data.notices.forEach(value => {
          allNoticesHolder.push(value);
        });
        var sortedAllNoticeHolder = [...allNoticesHolder];
        sortedAllNoticeHolder.sort(dateSort);
        setAllNotices(sortedAllNoticeHolder);
      }
    }

  }, [db_app]);
  useEffect(() => {
  }, [currentLanguage])
  useEffect(() =>{
    console.log(swipeableRef.current)
    if(swipeableRef.current != null) {
      swipeableRef.current.close;
    }
  },[allNotices])
  function navigateToHomeWork() {
    navigation.navigate('Homework', { initBy: route.name })
  }
  return (
    <SafeAreaView style={styles.body}>
      <FlatList
        style={styles.noti}
        showsVerticalScrollIndicator={false}
        data={allNotices}
        renderItem={({ item, index }) => {
          return (
            <Swipeable overshootRight={true} 
            onSwipeableOpen={() => deleteItem(index)} 
            renderRightActions={renderRight}
            ref={swipeableRef}
            >
              <Animated.View
                style={styles.notiItem}>
                {item.seen ? <></> : <View style={styles.fadeItem}></View>}
                <View style={styles.notiItem_Icon}>
                  {(item.type == 0) ?
                    (<Image source={require('../../assets/notiNhacnho.png')} />) :
                    (<Image source={require('../../assets/notiCapnhat.png')} />)}
                </View>
                <View style={styles.notiItem_Content}>
                  <Text
                    numberOfLines={4}
                    ellipsizeMode="tail"
                    style={styles.notiItem_Content_Title}>
                    {item.title}
                  </Text>
                  <View style={styles.notiItem_Content_ActionTime}>
                    <TouchableOpacity
                      onPress={() => navigateToHomeWork()}>
                      <Text
                        style={[
                          styles.notiItem_Content_ActionText,
                          {
                            color: item.type == 0 ? '#FF6E35' : '#0065FF',
                          },
                        ]}>
                        {strings.watch_now}
                      </Text>
                    </TouchableOpacity>
                    <View style={styles.row} >
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
                        backgroundColor: !item.seen ? '#ffffff' : (item.type == 0 ? '#FF6E35' : '#0065FF'),
                      },
                    ]}>

                  </View>

                </View>

              </Animated.View>
            </Swipeable>
          );
        }}
        keyExtractor={(item, index) => (item + index).toString()}
      />
    </SafeAreaView>
  );
}

