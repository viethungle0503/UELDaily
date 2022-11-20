import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {render, WebView} from 'react-native-webview';

export default function HomeDisplay({ navigation }) {
  const news = news_UEL.map((item, index) =>(
    <TouchableOpacity style={styles.row} key={index} onPress={() => {
      navigation.navigate('NewsDetail',{link: item.link})
    }}>
      <Image
        style={styles.hoatdongImage}
        source={{uri: item.imageURL}}
      />
      <View>
        <Text style={styles.hoatdongTitle}>
          {item.title}
        </Text>
        <View style={styles.row}>
          <Image source={require('../../assets/clock.png')} />
          <Text style={styles.hoatdongTitle}> {item.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  ));
  return (
    <ScrollView style={styles.body}>
      {loggedIn && (
        <View style={styles.studentwelcome}>
          <Image style={styles.studentAvatar} source={{ uri: currentUser.data.profileImage }} />
          <View>
            {currentUser ? (
              <Text style={styles.studentName}>
                {currentUser.data.lastName + ` ${currentUser.data.firstName}`}
              </Text>
            ) : null}
            <Text>{currentUser.key}</Text>
          </View>
          <TouchableOpacity style={styles.btnLanguage}>
            <MaterialCommunityIcons
              style={styles.svgLanguage}
              name={'web'}
              size={25}
            />
            
          </TouchableOpacity>
        </View>
      )}
      <Image
        style={styles.effect}
        source={require('../../assets/effectRound.png')}
      />
      <View style={styles.tienich}>
        <View style={styles.tienichHeader}>
          <Text style={styles.tienichText}>Tiện ích</Text>
          <TouchableOpacity style={styles.btnAllTienich}>
            <MaterialCommunityIcons name={'tune-variant'} size={12} />
            <Text style={{ color: 'black', marginLeft: 5 }}>Tất cả</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.col}>
          <View style={styles.tienichIcon}>
            <TouchableOpacity
              style={styles.tienichIcon_Item}
              onPress={() => navigation.navigate('Schedule')}>
              <Image
                style={styles.tienichIcon__ItemImg}
                source={require('../../assets/tkbIcon.png')}
              />
              <Text style={styles.tienichIcon__ItemText}>Thời khóa biểu</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tienichIcon_Item}
              onPress={() => navigation.navigate('ScoreBoard')}>
              <Image
                style={styles.tienichIcon__ItemImg}
                source={require('../../assets/xemdiemIcon.png')}
              />
              <Text style={styles.tienichIcon__ItemText}>Xem điểm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tienichIcon_Item}
              onPress={() => navigation.navigate('Exam')}>
              <Image
                style={styles.tienichIcon__ItemImg}
                source={require('../../assets/lichthiIcon.png')}
              />
              <Text style={styles.tienichIcon__ItemText}>Lịch thi</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tienichIcon}>
            <TouchableOpacity
              style={styles.tienichIcon_Item}
              onPress={() => navigation.navigate('Homework')}>
              <Image
                style={styles.tienichIcon__ItemImg}
                source={require('../../assets/baitapIcon.png')}
              />
              <Text style={styles.tienichIcon__ItemText}>Bài tập</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tienichIcon_Item}
              onPress={() => navigation.navigate('Tuition')}>
              <Image
                style={styles.tienichIcon__ItemImg}
                source={require('../../assets/hocphiIcon.png')}
              />
              <Text style={styles.tienichIcon__ItemText}>Học phí</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tienichIcon_Item}
              onPress={() => navigation.navigate('Ctxh')}>
              <Image
                style={styles.tienichIcon__ItemImg}
                source={require('../../assets/ctxhIcon.png')}
              />
              <Text style={styles.tienichIcon__ItemText}>Ngày CTXH</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.hoatdongHeader}>Hoạt động gần đây</Text>
        <View style={styles.hoatdong}>
          {news}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
  },

  col: {
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  row: {
    display: 'flex',
    // flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'flex-start',
    marginTop: 12,
    marginRight: 10,
    // overflow: 'hidden'
  },

  studentwelcome: {
    height: 140,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    zIndex: 1,
    padding: 30,
    position: 'relative',
    backgroundColor: '#D0E0FF',
  },
  studentName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#252525',
  },
  studentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 100,
    marginRight: 10,
  },
  btnLanguage: {
    position: 'absolute',
    right: 30,
    top: 35,
    zIndex: 2,
  },
  svgLanguage: {
    color: 'black',
  },
  effect: {
    position: 'absolute',
    right: 0,
    top: 0,

    zIndex: 2,
  },

  tienich: {
    flex: 2,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 32,
    paddingBottom: 20,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
    zIndex: 3,
    marginTop: -50,
  },
  tienichHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tienichIcon__ItemImg: {
    height: 32,
    width: 32,
  },
  tienichIcon: {
    display: 'flex',
    flexDirection: 'row',
    // marginHorizontal: 10,
    // justifyContent: 'center',
    marginVertical: 15,
    // marginHorizontal: 5,
    marginBottom: 0,
    // width: 100,
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  tienichIcon_Item: {
    display: 'flex',
    // justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
  tienichIcon__Item: {
    // display: 'flex',
  },
  tienichIcon__ItemIcon: {
    display: 'flex',
    justifyContent: 'center',
    // width: '100%',
    textAlignVertical: 'center',
  },
  tienichIcon__ItemText: {
    fontSize: 18,
    textAlign: 'center',
    // flexWrap: 'wrap',
    textAlignVertical: 'top',
    color: '#000000',
  },
  btnAllTienich: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    borderColor: '#D9D9D9',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,

    display: 'flex',
    // flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tienichText: {
    // color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#252525',
  },

  hoatdong: {
    flex: 4,
    backgroundColor: '#FFF',
    marginTop: 10,
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 110,
    paddingBottom: 30,
  },
  hoatdongHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#252525',
    paddingVertical: 3,
  },
  hoatdongTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#252525',
  },
  hoatdongImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginRight: 10, //cách hình
  },
});
