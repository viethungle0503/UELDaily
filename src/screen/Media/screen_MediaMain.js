import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './MediaStyles/screen_MediaMain_style'
export default function MediaMain({ navigation }) {
  
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
        {/* <Image
          style={styles.mediaItem_Image}
          source={{ uri: "asset:/" + item.logoLocation }} /> */}
          <Image
          style={styles.mediaItem_Image}
          source={require('../../components/323170536_859266148619105_984978855832508894_n.png')} />
        <View style={styles.mediaItem_Text}>
          <View style={styles.mediaDepartment}>
            <Text style={styles.mediaDepartmentName}>
              {item.data.name}
            </Text>

            <Text style={styles.mediaLastestTime}>9h</Text>
          </View>

          <Text>Danh sách sinh viên được gia hạn đóng học phí</Text>
        </View>
      </TouchableOpacity>
    )
  });
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
          Sự kiện
        </Text>
        {departments}
      </ScrollView>
    </View>
  )
}
