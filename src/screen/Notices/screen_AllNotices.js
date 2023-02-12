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

export default function Information({ navigation, route }) {
  const [allNotices, setAllNotices] = useState([]);
  const db_app = useSelector(state => state.database.db_app);
  const currentUser = useSelector(state => state.user.currentUser);
  const currentLanguage = useSelector(state => state.user.currentLanguage);
  useEffect(() => {
    if (allNotices.length == 0) {
      var allNoticesHolder = [...allNotices];
      var trueUser = db_app.find(
        x => x.data.email == currentUser.email,
      );
      trueUser.data.notices.forEach(value => {
        allNoticesHolder.push(value);
      });
      setAllNotices(allNoticesHolder);
    }
  }, [allNotices]);
  
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

