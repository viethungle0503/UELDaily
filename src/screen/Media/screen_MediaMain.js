import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './MediaStyles/screen_MediaMain_style';
import strings from '../Language';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
export default function MediaMain({ navigation }) {
  const currentLanguage = useSelector(state => state.user.currentLanguage);
  var departments = database_departments.map((item, index) => {
    //let existImage = "asset:/departments/" + item.data.logoUrl;
    //let defaultImage = "asset:/departments/default.png";
    return (
      <TouchableOpacity
        key={index}
        style={styles.mediaItem}
        onPress={() => navigation.navigate('MediaModal',
          {
            name: item.data.name, searchUrl: item.data.newsLink,
            email: item.data.email, phone: item.data.phone,
            website: item.data.website, fanpage: item.data.page,
            uri: "asset:/" + item.logoLocation
          })}>
        <Image
          style={styles.mediaItem_Image}
          source={{ uri: "asset:/" + item.logoLocation }} />
        <View style={styles.mediaItem_Text}>
          <View style={styles.mediaDepartment}>
            <Text style={styles.mediaDepartmentName}>
              {item.data.name}
            </Text>

            <Text style={styles.mediaLastestTime}>9h</Text>
          </View>

          <Text style={styles.mediaLastestNews}>Danh sách sinh viên được gia hạn đóng học phí</Text>
        </View>
      </TouchableOpacity>
    )
  });
  useEffect(() => {
  },[currentLanguage])
  return (
    <View style={styles.body}>
      <Image
        style={styles.effectLeft}
        source={require('../../assets/preLoginEffectLeft.png')}
      />
      <Image
        style={styles.effectRightBottom}
        source={require('../../assets/preLoginEffectRightBottom.png')}
      />
      <ScrollView style={{ flex: 1 }}>
        <Text style={{ padding: 20, fontWeight: 'bold', fontSize: 20, color: 'red' }}>
          {strings.news}
        </Text>
        {departments}
      </ScrollView>
    </View>
  )
}
