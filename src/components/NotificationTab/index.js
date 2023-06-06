import {useEffect, useState} from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  Animated,
  FlatList,
  SafeAreaView,
  Alert,
  ScrollView,
  Modal,
} from 'react-native';
import strings from '../../screen/Language';
import styles from './NotificationTabStyle';
import {Swipeable} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import {dateDiffInDays} from '../../screen/GlobalFunction';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  setSeenTrue,
  deleteNotification,
} from '../../redux/actions/notificationAction';
import NullDataScreen from '../nullDataScreen';
import {firebase} from '@react-native-firebase/database';
import {sendEmail} from '../../SendEmailService';
import NotificationItem from '../NotificationItem';

const dateSort = function (a, b) {
  // var destinationDay = (new Date("2050-12-31T01:30:50.000-07:00")).getTime()
  // var c = (new Date(a.creTime)).getTime();
  // var d = (new Date(b.creTime)).getTime();
  return new Date(b.creTime).getTime() - new Date(a.creTime).getTime();
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
};

export default function Information({navigation, route}) {
  const dispatch = useDispatch();
  const [allNotices, setAllNotices] = useState([]);
  const [modalVisibile, setModalVisibile] = useState(false);
  const [modalData, setModalData] = useState();
  const pageType = route.params?.pageType;
  const db_app = useSelector(state => state.database.db_app);
  const currentLanguage = useSelector(state => state.user.currentLanguage);
  const currentUser = useSelector(state => state.user.currentUser);
  const profileImage = useSelector(state => state.user.profileImage);
  useEffect(() => {
    if (
      db_app === null &&
      db_app.data === null &&
      db_app.data.notices === null
    ) {
      return;
    }
    let allNoticeHolder = [...db_app.data.notices];
    allNoticeHolder.sort(dateSort);
    switch (pageType) {
      case 'all':
        break;
      case 'warning':
        allNoticeHolder = allNoticeHolder.filter(item => item.type == 0);
        break;
      case 'update':
        allNoticeHolder = allNoticeHolder.filter(item => item.type == 1);
        break;
      default:
        break;
    }
    setAllNotices(prev => allNoticeHolder);
  }, [db_app]);
  const configureModal = item => {
    const modal = item => (
      <ScrollView>
        <View style={styles.modalHeader}>
          <Text style={styles.modalHeader_TitleText}>{item.title}</Text>
        </View>

        <View style={styles.responseItem}>
          <View style={styles.modalHeader_Department}>
            <Image
              style={styles.modalHeader_Icon}
              source={require('../../assets/component_ModalUpdateNoti_Icon.png')}
            />
            <View style={styles.row}>
              <View>
                <Text style={styles.modalHeader_DepartmentName}>
                  {item.sendBy}
                </Text>
                <Text style={styles.modalHeader_DepartmentMail}>
                  {item.senderEmail != null
                    ? item.senderEmail
                    : strings.no_corresponding_data}
                </Text>
                <Text style={styles.modalHeader_DepartmentMail}>
                  Đến: {currentUser.email}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.btnResponseEmail}
                onPress={() => {
                  sendEmail(
                    `younghungold@gmail.com`,
                    `This a test message from our app. Just ignore it`,
                    `Hey, we need 2 minutes of your time to fill this quick survey [link]`,
                    {
                      cc: `huyenntp20406c@st.uel.edu.vn; ngocptb20406c@st.uel.edu.vn; ngannst20406c@st.uel.edu.vn;binhtt20406c@st.uel.edu.vn;hunglv20406c@st.uel.edu.vn`,
                    },
                  )
                    .then(() => {
                      console.log('Your message was successfully sent!');
                    })
                    .catch(error => {
                      console.log(error);
                    });
                }}>
                <Image
                  style={styles.btnResponseEmail}
                  source={require('../../assets/btnReplyEmail.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.modalContent}>
            <Text style={styles.modalContentText}>{item.content}</Text>
          </View>
        </View>

        <View style={styles.responseItem}>
          <View style={styles.modalHeader_Department}>
            <Image style={styles.userAvatar} source={{uri: profileImage}} />

            <View>
              <Text style={styles.modalHeader_DepartmentName}>
                {currentUser.lastName + ' ' + currentUser.firstName}
              </Text>

              <Text style={styles.modalHeader_DepartmentMail}>
                Đến:{' '}
                {item.senderEmail != null
                  ? item.senderEmail
                  : strings.no_corresponding_data}
              </Text>
            </View>
          </View>
          <View style={styles.modalContent}>
            <Text style={styles.modalContentText}>{item.content}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.btnResponse}
          onPress={() => {
            Alert.alert(
              'Thông báo: Chức năng đang phát triển',
              'Tính năng này vẫn trong giai đoạn phát triển. Mong bạn quay lại sau',
              [
                {
                  text: 'Cancel',
                  onPress: () => {},
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: () => {},
                  style: 'default',
                },
              ],
              {
                cancelable: true,
                userInterfaceStyle: 'dark',
              },
            );
          }}>
          <Text style={styles.btnResponseText}>{strings.answer}</Text>
        </TouchableOpacity>
      </ScrollView>
    );
    setModalData(modal(item));
  };
  return (
    <SafeAreaView style={styles.body}>
      {allNotices.length == 0 ? (
        <NullDataScreen />
      ) : (
        <>
          <FlatList
            style={styles.noti}
            showsVerticalScrollIndicator={false}
            data={allNotices}
            renderItem={({item, index}) => {
              return (
                <NotificationItem
                  item={item}
                  index={index}
                  navigation={navigation}
                  route={route}
                  setModalVisibile={setModalVisibile}
                  configureModal={configureModal}
                />
              );
            }}
            keyExtractor={(item, index) => (item.id + index).toString()}
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisibile}
            onRequestClose={() => setModalVisibile(false)}>
            <View style={styles.modalContainer}>
              {/* 2 effect */}
              <Image
                style={styles.modalEffectLeft}
                source={require('../../assets/preLoginEffectLeft.png')}
              />
              <Image
                style={styles.modalEffectRight}
                source={require('../../assets/preLoginEffectRightBottom.png')}
              />
              {/* 2 effect */}

              <TouchableOpacity
                style={styles.btnBackContainer}
                onPress={() => setModalVisibile(false)}>
                <MaterialCommunityIcons
                  name={'keyboard-backspace'}
                  size={30}
                  color={'#000'}
                />
              </TouchableOpacity>
              {modalData}
            </View>
          </Modal>
        </>
      )}
    </SafeAreaView>
  );
}
