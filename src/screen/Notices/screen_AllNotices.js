import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated
} from 'react-native';
import { red100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import styles from './NoticesStyles/screen_AllNotices_style'
import { Swipeable } from 'react-native-gesture-handler';

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

export default function Information({ navigation, route }) {
  const [allNotices, setAllNotices] = useState([]);


  useEffect(() => {
    if (allNotices.length == 0) {
      var allNoticesHolder = [...allNotices];
      var trueUser = database_app.find(
        x => x.data.email == currentUser.data.email,
      );
      trueUser.data.notices.forEach(value => {
        allNoticesHolder.push(value);
      });
      setAllNotices(allNoticesHolder);
    }
  }, [allNotices]);

  function navigateToHomeWork() {
    navigation.navigate('Homework', { initBy: route.name })
  }
  return (
    <View style={styles.body}>
      <ScrollView style={styles.noti} showsVerticalScrollIndicator={false}>
        {allNotices.map((item, index) => {
          let creTime = new Date(item.creTime);
          let today = new Date();
          let diff = new Date((Math.abs(today.getTime() - creTime.getTime())));
          var days = 0;
          var hours = diff / (1000 * 3600);
          while (hours > 23) {
            days += 1;
            hours -= 24;
          }
          let time_gap = ``;
          if (days != 0) {
            time_gap = `${Math.floor(days)}d ${Math.floor(hours)}h`;
          }
          else {
            time_gap = `${Math.floor(hours)}h`;
          }

          return (
            <Swipeable overshootRight={true} onSwipeableOpen={deleteItem} renderRightActions={renderRight}
              key={item._id + index}>
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
                        Xem ngay
                      </Text>
                    </TouchableOpacity>
                    <View style={styles.row} >
                      <Image source={require('../../assets/notiHistory.png')} />
                      <Text style={{ color: 'red' }}>&nbsp;{time_gap}</Text>
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
        })}
      </ScrollView>
    </View>
  );
}

