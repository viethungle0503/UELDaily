import {Swipeable, GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  Animated,
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import strings from '../../screen/Language';
import {dateDiffInDays} from '../../screen/GlobalFunction';
import styles from './NotificationItemStyle';

export default function NotificationItem() {
  RNBootSplash.hide({fade: true});

  const renderRight = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-50, 0.5],
      outputRange: [1, 0.1],
    });
    const Style = {
      transform: [
        {
          scale,
        },
      ],
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
        <Animated.Text
          style={[
            Style,
            {
              color: '#FFF',
              fontWeight: 'bold',
              fontSize: 10,
            },
          ]}>
          Xóa
        </Animated.Text>
      </View>
    );
  };
  const item = {
    creTime: '2022-11-01T01:30:50.000-07:00',
    id: 'ntf0001',
    redirectType: 2,
    seen: false,
    sendBy: 'System',
    senderId: 'sys',
    title: 'Đã có điểm thi môn học Hệ thống thông tin kinh doanh',
    type: 1,
    uri: '/',
  };
  let row = [];
  let prevOpenedRow;
  const closeRow = index => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
    prevOpenedRow.close();
  };
  return (
    <SafeAreaView style={styles.body}>
      <GestureHandlerRootView style={styles.noti}>
        <Swipeable
          renderRightActions={renderRight}
          overshootRight={true}
          ref={ref => (row[0] = ref)}
          onSwipeableOpen={() => console.log('Good')}>
          <Animated.View>
            <TouchableOpacity style={styles.notiItem}>
              <View style={styles.notiItem_Icon}>
                {item.type == 0 ? (
                  <Image source={require('../../assets/notiNhacnho.png')} />
                ) : (
                  <Image source={require('../../assets/notiCapnhat.png')} />
                )}
              </View>
              <View style={styles.notiItem_Content}>
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={styles.notiItem_Content_Title}>
                  {item.title}
                </Text>
                <SafeAreaView style={styles.notiItem_Content_ActionTime}>
                  <Text
                    style={[
                      {
                        color: item.type == 0 ? '#FF6E35' : '#0065FF',
                      },
                    ]}>
                    {strings.watch_now}
                  </Text>
                  <View style={styles.row}>
                    <Image source={require('../../assets/notiHistory.png')} />
                    <Text style={{color: 'red'}}>
                      {dateDiffInDays(new Date(), new Date(item.creTime))}
                    </Text>
                  </View>
                </SafeAreaView>
              </View>
              <View style={styles.notiItem_Status}>
                <View
                  style={[
                    styles.notiItem_Status_ReadIcon,
                    {
                      backgroundColor: !item.seen
                        ? item.type == 0
                          ? '#FF6E35'
                          : '#0065FF'
                        : '#ffffff',
                    },
                  ]}></View>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </Swipeable>
        <Swipeable renderRightActions={renderRight} overshootRight={true}>
          <Animated.View>
            <TouchableOpacity style={styles.notiItem}>
              <View style={styles.notiItem_Icon}>
                {item.type == 0 ? (
                  <Image source={require('../../assets/notiNhacnho.png')} />
                ) : (
                  <Image source={require('../../assets/notiCapnhat.png')} />
                )}
              </View>
              <View style={styles.notiItem_Content}>
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={styles.notiItem_Content_Title}>
                  {item.title}
                </Text>
                <SafeAreaView style={styles.notiItem_Content_ActionTime}>
                  <Text
                    style={[
                      {
                        color: item.type == 0 ? '#FF6E35' : '#0065FF',
                      },
                    ]}>
                    {strings.watch_now}
                  </Text>
                  <View style={styles.row}>
                    <Image source={require('../../assets/notiHistory.png')} />
                    <Text style={{color: 'red'}}>
                      {dateDiffInDays(new Date(), new Date(item.creTime))}
                    </Text>
                  </View>
                </SafeAreaView>
              </View>
              <View style={styles.notiItem_Status}>
                <View
                  style={[
                    styles.notiItem_Status_ReadIcon,
                    {
                      backgroundColor: !item.seen
                        ? item.type == 0
                          ? '#FF6E35'
                          : '#0065FF'
                        : '#ffffff',
                    },
                  ]}></View>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </Swipeable>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
