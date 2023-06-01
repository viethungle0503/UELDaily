import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import styles from './ProfileStyles/screen_StudentCard_style';
import strings from '../Language';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
export default function StudentCard({navigation}) {
  const currentUser = useSelector(state => state.user.currentUser);
  const currentLanguage = useSelector(state => state.user.currentLanguage);
  useEffect(() => {
    console.log(currentUser);
  }, [currentLanguage]);
  return (
    <ScrollView style={styles.modalContainer}>
      <Image
        style={styles.effectLeft}
        source={require('../../assets/preLoginEffectLeft.png')}
      />
      <Image
        style={styles.modalEffect}
        source={require('../../assets/mediaEffect.png')}
      />

      <View style={styles.modalHeader}>
        <TouchableOpacity
          style={styles.modalHeader_btnBackContainer}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/btnBack.png')}
            style={styles.modalHeader_btnBack}
          />
        </TouchableOpacity>

        <Text style={styles.modalHeader_Title}>Thẻ sinh viên điện tử</Text>
      </View>

      <View style={styles.modalContent}>
        {/* <View
          style={{
            borderBottomColor: 'red',
            // borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomWidth: 5,
            alignSelf: 'stretch',
          }}></View> */}
        <Text
          style={{
            textTransform: 'uppercase',
            color: 'red',
            fontWeight: 'bold',
            fontSize: 25,
          }}>
          {'THẺ SINH VIÊN'.toUpperCase()}
        </Text>
        <Image
          source={{
            uri: `https://myuel.uel.edu.vn/Modules/UIS/upload/HinhSV/${currentUser.id}.jpg`,
          }}
          style={{height: 200, width: 300}}
          resizeMode="contain"
        />
        <Text
          style={{
            fontWeight: 'bold',
            color: 'blue',
          }}>{`${currentUser.lastName} ${currentUser.firstName}`}</Text>
        <Text
          style={{
            color: 'blue',
          }}>{`Ngày sinh: ${currentUser.dob}`}</Text>
        <Text
          style={{
            color: 'blue',
          }}>{`${currentUser.id}`}</Text>
        <Text
          style={{
            color: 'blue',
          }}>{`LỚP ${currentUser.id.substr(0, 6)}${currentUser.email.substr(
          currentUser.email.indexOf('@st.uel.edu.vn') - 1,
          1,
        )}`}</Text>
        <Image
          source={require('../../assets/barcode.png')}
          style={{width: 200, height: 35, marginTop:20}}
        />
        {/* <View
          style={{
            borderBottomColor: 'red',
            // borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomWidth: 5,
            alignSelf: 'stretch',
          }}></View> */}
      </View>
    </ScrollView>
  );
}
