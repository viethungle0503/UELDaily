import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import LinearGradient from 'react-native-linear-gradient'
export default function MediaNoti({navigation}) {
  return (
    <View style={styles.body}>
      <View style={styles.mediaNoti_Lastest}>

        <TouchableOpacity style={styles.lastestItem}>
          <Image source={require('../../assets/mediaItemImage.png')} resizeMode="cover" style={{    flex: 1, justifyContent: "center", zIndex: 1}}>
          </Image>

          <Text>
          Chương trình Học bổng Jabil Việt Nam 2023
          </Text>

          <Text>Công ty Jabil Việt Nam tọa lạc tại Khu Công Nghệ Cao (SHTP)...</Text>

        </TouchableOpacity>

      </View>

      <ScrollView style={styles.mediaNoti_All}>
        <Text style={styles.mediaNotiHeader}>Tổng hợp</Text>

        <TouchableOpacity
          style={styles.mediaNotiItem}
          onPress={() => {}}>
          <Image style={styles.mediaNotiItem_Image} source={require('../../assets/mediaNotiAll.png')} />

          <View style={styles.mediaNotiItem_Content}>

            <Text style={styles.mediaNotiItem_ContentTitle}>Danh sách sinh viên được gia hạn học phí</Text>

            <View style={styles.row}>
              <Image style={styles.mediaNotiItem_DepartmentImage}
                source={require('../../assets/mediaItemImage.png')}>
              </Image>
              <Text style={styles.mediaNotiItem_ContentDepartment}>P. TS&CTSV</Text>
              <Text style={styles.mediaNotiItem_ContentTime}>21/11/2022</Text>
            </View>

          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.mediaNotiItem}
          onPress={() => {}}>
          <Image style={styles.mediaNotiItem_Image} source={require('../../assets/mediaNotiAll.png')} />

          <View style={styles.mediaNotiItem_Content}>

            <Text style={styles.mediaNotiItem_ContentTitle}>Danh sách sinh viên được gia hạn học phí</Text>

            <View style={styles.row}>
              <Image style={styles.mediaNotiItem_DepartmentImage}
                source={require('../../assets/mediaItemImage.png')}>
              </Image>
              <Text style={styles.mediaNotiItem_ContentDepartment}>P. TS&CTSV</Text>
              <Text style={styles.mediaNotiItem_ContentTime}>21/11/2022</Text>
            </View>

          </View>
        </TouchableOpacity>

        
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
    // paddingTop: 10,
  },
  mediaNoti_Lastest:{
    flex: 4
  },
  mediaNoti_All:{
    flex: 3
  },
  lastestItem:{
    maxWidth: 200,
    borderRadius: 10,
    flexDirection: 'column'
  },
  mediaNotiItem:{
    flexDirection: 'row',
    marginBottom: 10,
  },
  mediaNotiHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#252525',
    paddingVertical: 16,
  },
  mediaNotiItem_ContentTitle: {
    display: 'flex',
    fontSize: 15,
    fontWeight: '500',
    color: '#252525',
    marginRight: 32,
    textAlign: 'justify',
  },
  mediaNotiItem_Content: {
    paddingRight: 32,
    marginRight: 52,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 7
  },
  mediaNotiItem_DepartmentImage:{
    borderRadius: 100,
    width: 20,
    aspectRatio: 1,
    resizeMode: 'contain'
  },
  mediaNotiItem_ContentDepartment:{
    color: '#FF6E35'
  },
  mediaNotiItem_ContentTime: {
    marginLeft: 5,
  },
  mediaNotiItem_Image: {
    width: 110,
    height: 75,
    borderRadius: 4,
    marginRight: 10, //cách hình
  },
  row:{
    flexDirection: 'row'
  }

});
