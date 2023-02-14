import { useEffect, useState } from 'react';
import { Alert, FlatList, SafeAreaView } from 'react-native';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated
} from 'react-native';
import strings from '../Language';
import styles from './NoticesStyles/screen_AllNotices_style'
import { Swipeable } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { dateDiffInDays } from '../GlobalFunction';

const deleteItem = () => {
  alert('Chắc xóa chưa?')
}
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
      onPress={deleteItem}>

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
  useEffect(() => {
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
  }, [db_app]);

  useEffect(() => {
  }, [currentLanguage, allNotices])

  function navigateToHomeWork() {
    navigation.navigate('Homework', { initBy: route.name })
  }
  (function () {
    if (typeof Object.defineProperty === 'function') {
      try { Object.defineProperty(Array.prototype, 'sortBy', { value: sb }); } catch (e) { }
    }
    if (!Array.prototype.sortBy) Array.prototype.sortBy = sb;

    function sb(f) {
      for (var i = this.length; i;) {
        var o = this[--i];
        this[i] = [].concat(f.call(o, o, i), o);
      }
      this.sort(function (a, b) {
        for (var i = 0, len = a.length; i < len; ++i) {
          if (a[i] != b[i]) return a[i] < b[i] ? -1 : 1;
        }
        return 0;
      });
      for (var i = this.length; i;) {
        this[--i] = this[i][this[i].length - 1];
      }
      return this;
    }
  })();
  return (
    <SafeAreaView style={styles.body}>
      <FlatList
        style={styles.noti}
        showsVerticalScrollIndicator={false}
        data={allNotices}
        renderItem={({ item }) => {
          return (
            <Swipeable overshootRight={true} onSwipeableOpen={deleteItem} renderRightActions={renderRight}>
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

