import {Swipeable, GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  Animated,
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import {firebase} from '@react-native-firebase/database';
import strings from '../../screen/Language';
import {dateDiffInDays} from '../../screen/GlobalFunction';
import styles from './NotificationItemStyle';
import {useEffect, useRef, useState} from 'react';
import useUpdateEffect from '../../screen/CustomeHook';
import {useSelector} from 'react-redux';
import {Alert} from 'react-native';

export default function NotificationItem(props) {
  const user = useSelector(state => state.user.currentUser);
  const db_app = useSelector(state => state.database.db_app);
  const index = props.index;
  const [item, setItem] = useState(props.item);
  const swipeableRef = useRef(null);
  const firebaseRef = firebase
    .app()
    .database(
      'https://ueldaily-hubing-default-rtdb.asia-southeast1.firebasedatabase.app',
    )
    .ref(`/users/${db_app?.key}/notices`);
  const renderRight = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-50, 0.5],
      outputRange: [1, 0.1],
      // extrapolate: 'clamp',
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
  const updateSeen = async () => {
    await firebaseRef
      .orderByChild('id')
      .equalTo(item.id)
      .once('value', snapshot => {
        if (snapshot.exists()) {
          snapshot.forEach(child => {
            firebaseRef.child(child.key).update(
              {
                seen: true,
              },
              onComplete,
            );
          });
        }
      });
    setItem(prevState => ({
      ...prevState,
      seen: true,
    }));
  };
  const onComplete = error => {
    if (error) {
      console.log('Update failed');
    } else {
      console.log('Update succeeded');
    }
  };
  const onItemPress = async () => {
    if (!item.seen) {
      await updateSeen();
    }
    if (item.type == 0) {
      switch (item?.redirectType) {
        case '1':
          props.navigation.navigate('Schedule', {
            initBy: props.route.name,
          });
          break;
        case '2':
          props.navigation.navigate('ScoreBoard', {
            initBy: props.route.name,
          });
          break;
        case '3':
          props.navigation.navigate('Exam', {
            initBy: props.route.name,
          });
          break;
        case '4':
          props.navigation.navigate('Homework', {
            initBy: props.route.name,
          });
          break;
        case '5':
          props.navigation.navigate('Tuition', {
            initBy: props.route.name,
          });
          break;
        case '6':
          props.navigation.navigate('Ctxh', {
            initBy: props.route.name,
          });
          break;
        default:
          props.navigation.navigate('Homework', {
            initBy: props.route.name,
          });
      }
    }
    if (item.type == 1) {
      props.configureModal(item);
      props.setModalVisibile(true);
    }
  };
  const closeSwipeable = () => {
    swipeableRef.current.close();
  };
  const openRight = () => {
    swipeableRef.current.openRight();
  };
  const openLeft = () => {
    swipeableRef.current.openLeft();
  };
  const onSwipeableOpen = direction => {
    Alert.alert(
      'Thông báo',
      'Bạn có muốn xóa thông báo này?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            closeSwipeable();
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            closeSwipeable();
            onDeleteItem();
          },
          style: 'default',
        },
      ],
      {
        cancelable: true,
        userInterfaceStyle: 'dark',
      },
    );
  };
  const onDeleteItem = async () => {
    await firebaseRef
      .orderByChild('id')
      .equalTo(item.id)
      .once('value', snapshot => {
        if (snapshot.exists()) {
          snapshot.forEach(child => {
            firebaseRef.child(child.key).remove(onComplete);
          });
        }
      });
  };
  useUpdateEffect(() => {
    setItem(prev => props.item);
  }, [props.item]);
  return (
    <Swipeable
      renderRightActions={renderRight}
      overshootRight={true}
      overshootLeft={true}
      friction={1}
      onSwipeableOpen={onSwipeableOpen}
      ref={swipeableRef}>
      <Animated.View>
        <TouchableOpacity style={styles.notiItem} onPress={onItemPress}>
          {!item.seen ? <></> : <View style={styles.fadeItem}></View>}
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
  );
}
