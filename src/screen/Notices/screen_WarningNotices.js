import { useEffect, useState } from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './NoticesStyles/screen_WarningNotices_style'

export default function WarningNotices({ navigation, route }) {
  const [warningNotices, setWarningNotices] = useState([]);
  useEffect(() => {
    if (warningNotices.length == 0) {
      var warningNoticesHolder = [...warningNotices];
      var trueUser = database_app.find(x => x.data.email == currentUser.data.email);
      trueUser.data.notices.filter(x => x.type == 0).forEach((value) => {
        warningNoticesHolder.push(value);
      })
      setWarningNotices(warningNoticesHolder);
    }
  }, [warningNotices])
  function navigateToHomeWork() {
    navigation.navigate('Homework', { initBy: route.name })
  }
  return (
    <View style={styles.body}>
      <ScrollView style={styles.noti} showsVerticalScrollIndicator={false}>
        {warningNotices.map((item, index) => {
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
            <TouchableOpacity
              style={styles.notiItem}
              key={item._id + index}
              onPress={() => {
                console.log(warningNotices[item])
                navigateToHomeWork()
              }
              }>
              {item.seen ? <></> : <View style={styles.fadeItem}></View>}
              <View style={styles.notiItem_Icon}>
                <Image source={require('../../assets/notiNhacnho.png')} />
              </View>

              <View style={styles.notiItem_Content}>
                <Text style={styles.notiItem_Content_Title}>
                  {item.title}
                </Text>
                <TouchableOpacity
                  style={styles.notiItem_Content_Action}
                  onPress={() => navigateToHomeWork()}>
                  <Text
                    style={[
                      styles.notiItem_Content_ActionText,
                      {
                        color: '#FF6E35',
                      },
                    ]}>
                    Xem ngay
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.notiItem_Status}>
                <View
                  style={[
                    styles.notiItem_Status_ReadIcon,
                    {
                      backgroundColor: item.seen ? '#FF6E35' : '#ffffff',
                    },
                  ]}></View>

                <View style={styles.row}>
                  <Image source={require('../../assets/notiHistory.png')} />
                  <Text style={{ color: 'red' }}>&nbsp;{time_gap}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  );
}

