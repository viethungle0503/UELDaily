import { useEffect, useState } from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  FlatList,
  SafeAreaView
} from 'react-native';
import styles from './NoticesStyles/screen_WarningNotices_style';
import { useSelector } from 'react-redux';
import { dateDiffInDays } from '../GlobalFunction';
import { Swipeable } from 'react-native-gesture-handler';
import strings from '../Language';

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

export default function WarningNotices({ navigation, route }) {
  const db_app = useSelector(state => state.database.db_app);
  const currentLanguage = useSelector(state => state.user.currentLanguage);
  const currentUser = useSelector(state => state.user.currentUser);
  const [warningNotices, setWarningNotices] = useState([]);
  useEffect(() => {
    if (warningNotices.length == 0) {
      var warningNoticesHolder = [...warningNotices];
      var trueUser = db_app.find(x => x.data.email == currentUser.email);
      trueUser.data.notices.filter(x => x.type == 0).forEach((value) => {
        warningNoticesHolder.push(value);
      })
      var sortedWarningNoticesHolder = [...warningNoticesHolder];
      sortedWarningNoticesHolder.sort((a, b) => (new Date(b.creTime)).getTime() - (new Date(a.creTime)).getTime());
      setWarningNotices(sortedWarningNoticesHolder);
    }
  }, [warningNotices]);
  
  useEffect(() => {
  }, [currentLanguage])
  function navigateToHomeWork() {
    navigation.navigate('Homework', { initBy: route.name })
  }
  return (
    <SafeAreaView style={styles.body}>
      <FlatList
        style={styles.noti}
        showsVerticalScrollIndicator={false}
        data={warningNotices}
        renderItem={({ item }) => {
          return (
            <Swipeable overshootRight={true} onSwipeableOpen={deleteItem} renderRightActions={renderRight}>
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
                      <Text style={{ color: 'red' }}>&nbsp;{dateDiffInDays(new Date(),new Date(item.creTime))}</Text>
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

