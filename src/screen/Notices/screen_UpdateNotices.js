import {useEffect, useState} from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './NoticesStyles/screen_UpdateNotices_style'

export default function UpdateNotices({navigation}) {
  const [updateNotices, setUpdateNotices] = useState([]);
  useEffect(() => {
    if (updateNotices.length == 0) {
      var updateNoticesHolder = [...updateNotices];
      var trueUser = database_app.find(
        x => x.data.email == currentUser.data.email,
      );
      trueUser.data.notices
        .filter(x => x.type == 1)
        .forEach(value => {
          updateNoticesHolder.push(value);
        });
      setUpdateNotices(updateNoticesHolder);
    }
  }, [updateNotices]);
  return (
    <View style={styles.body}>
      <ScrollView style={styles.noti} showsVerticalScrollIndicator={false}>
        {updateNotices.map((item, index) => {
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
            <TouchableOpacity style={styles.notiItem} key={item._id + index}>
              {item.seen ? <></> : <View style={styles.fadeItem}></View>}
              <View style={styles.notiItem_Icon}>
                <Image source={require('../../assets/notiCapnhat.png')} />
              </View>

              <View style={styles.notiItem_Content}>
                <Text
                  style={styles.notiItem_Content_Title}
                  numberOfLines={4}
                  ellipsizeMode="tail">
                  {item.title}
                </Text>

                <Text
                  style={styles.notiItem_Content_Describe}
                  numberOfLines={2}
                  ellipsizeMode="tail">
                  {item.content}
                </Text>

                <TouchableOpacity style={styles.notiItem_Content_Action}>
                  <Text
                    style={[
                      styles.notiItem_Content_ActionText,
                      {
                        color: '#0065FF',
                      },
                    ]}>
                    {item.sendBy}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.notiItem_Status}>
                <View
                  style={[
                    styles.notiItem_Status_ReadIcon,
                    {
                      backgroundColor: item.seen ? '#0065FF' : '#ffffff',
                    },
                  ]}></View>
                <View style={styles.row}>
                  <Image source={require('../../assets/notiHistory.png')} />
                  <Text style={{color: 'red'}}>&nbsp;{time_gap}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

