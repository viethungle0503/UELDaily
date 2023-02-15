import React, { useEffect, useState } from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Animated,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import styles from './NoticesStyles/screen_UpdateNotices_style'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Swipeable } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { dateDiffInDays } from '../GlobalFunction';
import strings from '../Language';

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
      }}>
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

export default function UpdateNotices({ navigation }) {
  const db_app = useSelector(state => state.database.db_app);
  const currentUser = useSelector(state => state.user.currentUser);
  const currentLanguage = useSelector(state => state.user.currentLanguage);
  const [openModalUpdateNoti, setopenModalUpdateNoti] = useState(false);
  const [modalData, setModalData] = useState();
  const [updateNotices, setUpdateNotices] = useState([]);
  let row = [];
  let prevOpenedRow;
  const closeRow = (index) => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
    prevOpenedRow.close();
  }
  const deleteItem = (index) => {
    Alert.alert(
      "Thông báo",
      "Bạn có muốn xóa thông báo này?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: () => {
          closeRow(index);
          setUpdateNotices(updateNotices.filter((_, i) => i !== index));
        }, style: "default" }
      ],
      {
        cancelable: true,
        userInterfaceStyle: "dark",
      }
    );
  }
  useEffect(() => {
    var trueUser = db_app.find(
      x => x.data.email == currentUser.email,
    );
    if (trueUser != undefined) {
      var updateNoticesHolder = [...updateNotices];
      trueUser.data.notices
        .filter(x => x.type == 1)
        .forEach(value => {
          updateNoticesHolder.push(value);
        });
      var sortedUpdateNoticesHolder = [...updateNoticesHolder];
      sortedUpdateNoticesHolder.sort((a, b) => (new Date(b.creTime)).getTime() - (new Date(a.creTime)).getTime());
      setUpdateNotices(sortedUpdateNoticesHolder);
    }
  }, [db_app]);

  useEffect(() => {
  }, [currentLanguage, updateNotices])
  return (
    <SafeAreaView style={styles.body}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={openModalUpdateNoti}
        onRequestClose={() => setopenModalUpdateNoti(false)}
      >
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
            onPress={() => setopenModalUpdateNoti(false)}
          >
            <MaterialCommunityIcons
              name={'keyboard-backspace'}
              size={30}
              color={'#000'}
            />
          </TouchableOpacity>
          {modalData}
        </View>
      </Modal>
      <FlatList
        style={styles.noti}
        showsVerticalScrollIndicator={false}
        data={updateNotices}
        renderItem={({ item,index }) => {
          function settingModal() {
            const title = (() => (
              <ScrollView>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalHeader_TitleText}>
                    {item.title}
                  </Text>
                  <View style={styles.modalHeader_Department}>
                    <Image
                      style={styles.modalHeader_Icon}
                      source={require('../../assets/component_ModalUpdateNoti_Icon.png')} />
                    <View>
                      <Text style={styles.modalHeader_DepartmentName}>
                        {item.sendBy}
                      </Text>
                      <Text style={styles.modalHeader_DepartmentMail}>
                        {strings.no_corresponding_data}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.modalContent}>
                  <Text style={styles.modalContentText}>
                    {item.content}

                  </Text>
                </View>


                <TouchableOpacity style={styles.btnResponse}>
                  <Text style={styles.btnResponseText}>{strings.answer}</Text>
                </TouchableOpacity>

              </ScrollView>

            ));
            setModalData(title);
          }
          return (
            <Swipeable overshootRight={true} onSwipeableOpen={() => deleteItem(index)} 
            renderRightActions={renderRight}
            ref={ref => row[index] = ref}
            >
              <Animated.View
                style={styles.notiItem}>
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

                  <View style={styles.notiItem_Content_ActionTime}>
                    <TouchableOpacity style={styles.notiItem_Content_Action}
                      onPress={() => {
                        settingModal();
                        setopenModalUpdateNoti(true)
                      }}>
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

                    <View style={styles.row}>
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
                        backgroundColor: item.seen ? '#0065FF' : '#ffffff',
                      },
                    ]}></View>

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

