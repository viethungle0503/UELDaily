import { useEffect, useState } from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 14,
    // paddingTop: 10,
  },

  noti: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 20,
    paddingHorizontal: 15,

    // marginVertical: 20,
    backgroundColor: '#F7F9FE',
    borderRadius: 10,
    marginBottom: 50,
  },
  notiItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,

    marginBottom: 5,

    shadowColor: 'rgb(0, 101, 255)',
    shadowOffset: {
      width: 0,
      height: 0.1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,

    elevation: 2,

    position: 'relative',
  },
  fadeItem: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 5,
    zIndex: 1,
  },

  notiItem_Icon: {
    flex: 1,
    paddingTop: 2,
  },
  notiItem_Content: {
    flex: 6,
    paddingLeft: 6,
  },
  notiItem_Status: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  notiItem_Content_Title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#080B09',
  },
  notiItem_Content_Action: {
    paddingTop: 5,
  },
  notiItem_Content_ActionText: {
    fontSize: 12,
  },

  notiItem_Status_ReadIcon: {
    opacity: 1,
    width: 10,
    height: 10,

    borderRadius: 100,
  },

  notiHeader_Text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#252525',
    paddingVertical: 5,
  },
  notiHeader_Sort: {
    // display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#F7F9FE',
    height: 40,
    borderRadius: 10,

    justifyContent: 'center',
  },
  notiHeader_Sort_btnActive: {
    width: '33%',
    // alignSelf: 'stretch',

    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 10,
    backgroundColor: '#fff',
    color: '#0065FF',

    shadowColor: 'rgb(51, 132, 255)',
    shadowOffset: {
      width: 0,
      height: 0.1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,

    elevation: 2,
  },
  notiHeader_Sort_btnNotPress: {
    width: '33%',
    // alignSelf: 'stretch',

    justifyContent: 'center',
    alignItems: 'center',
  },

  effect: {
    position: 'absolute',
    right: 0,
    top: 0,

    zIndex: 2,
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'flex-start',
    // justifyContent: 'space-around',
  },
  row: {
    display: 'flex',
    // flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',

    // alignContent: 'flex-end',
    // marginTop: 12,
    // marginRight: 10,
    // overflow: 'hidden'
  },
});
