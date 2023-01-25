import React, {useEffect, useState} from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal
} from 'react-native';
import styles from './NoticesStyles/screen_UpdateNotices_style'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import { ModalUpdateNoti } from '../../components/ModalUpdateNoti';

export default function UpdateNotices({navigation}) {

  // modal
  // const [open, setOpen] = useState(false);
  const [openModalUpdateNoti, setopenModalUpdateNoti] = useState(false);
  const changeModalUpdateNotiVisible = (bool) => {
    setopenModalUpdateNoti(bool)
  }
  
  const [modalData, setModalData] = useState();
  // const [modalContent, setModalContent] = useState();
  
  // modal


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

      <Modal
        animationType='slide'
        transparent={true}
        visible={openModalUpdateNoti}
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
            onPress={() => changeModalUpdateNotiVisible(false)}
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
      
      <ScrollView 
        style={styles.noti} 
        showsVerticalScrollIndicator={false}>

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
                      source={require('../../assets/component_ModalUpdateNoti_Icon.png')}/>

                    <View>
                      <Text style={styles.modalHeader_DepartmentName}>
                        {item.sendBy}
                      </Text>

                      <Text style={styles.modalHeader_DepartmentMail}>
                        phongtc@uel.edu.vn
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
                  <Text style={styles.btnResponseText}>Trả lời</Text>
                </TouchableOpacity>

              </ScrollView>
              
            ));
            
            setModalData(title);
            {/* setModalContent(content); */}
            setopenModalUpdateNoti(true);
          }

          return (

            <TouchableOpacity 
              onPress={() => settingModal()}
              // onPress={() => changeModalUpdateNotiVisible(true)}
              style={styles.notiItem} key={item._id + index}>
              
              

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

                  <View style={styles.row}>
                    <Image source={require('../../assets/notiHistory.png')} />
                    <Text style={{color: 'red'}}>&nbsp;{time_gap}</Text>
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
            </TouchableOpacity>
          );
        })}
      </ScrollView>


      
    </View>
  );
}

