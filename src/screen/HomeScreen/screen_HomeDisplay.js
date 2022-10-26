import { useSelector, useDispatch } from 'react-redux';
import {
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { setUser, setloggedIn } from '../../redux/actions';
import {
    Image,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
  
  } from 'react-native';


export default function HomeDisplay({navigation}) {
    const dispatch = useDispatch();
    const { user, loggedIn } = useSelector(state => state.userReducer);
    const signOut = async () => {
      try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        auth()
          .signOut()
          .then(() => {
            dispatch(setloggedIn(false));
          });
        // setuserInfo([]);
      } catch (error) {
        console.error(error);
      }
    };
    return(
        <ScrollView style={styles.body}>
          {loggedIn && (
            <View style={styles.studentwelcome}>
              <Image source={require('../../assets/user.png')} />
              <View>
                {user ?
                  <Text style={styles.studentName}>
                    {user.displayName}
                  </Text> : null}
                <Text>K204060305</Text>

              </View>

              <TouchableOpacity style={styles.btnLanguage}>
                <Image source={require('../../assets/btnChangeLanguage.png')} />
              </TouchableOpacity>

            </View>)}

          <Image style={styles.effect} source={require('../../assets/effectRound.png')} />

          <View style={styles.tienich}>
            <View style={styles.tienichHeader}>
              <Text style={styles.tienichText}>Tiện ích</Text>

              <TouchableOpacity style={styles.btnAllTienich}>
                <Image source={require('../../assets/btnAllTienich.png')} />
                <Text>Tất cả</Text>
              </TouchableOpacity>

            </View>

            <View style={styles.col}>
              <View style={styles.tienichIcon}>
                <TouchableOpacity style={styles.tienichIcon_Item}
                onPress={() => navigation.navigate('Schedule')}>
                  <Image style={styles.tienichIcon_ItemIcon} source={require('../../assets/tkbIcon.png')} />
                  <Text style={styles.tienichIcon__ItemText}>Thời khóa biểu</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tienichIcon_Item}
                onPress={() => navigation.navigate('ScoreBoard')}>
                  <Image source={require('../../assets/xemdiemIcon.png')} />
                  <Text style={styles.tienichIcon__ItemText}>Xem điểm</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tienichIcon_Item}
                  onPress={() => navigation.navigate('Exam')}>
                  <Image source={require('../../assets/lichthiIcon.png')} />
                  <Text style={styles.tienichIcon__ItemText}>Lịch thi</Text>
                </TouchableOpacity>

              </View>

              <View style={styles.tienichIcon}>
                <TouchableOpacity style={styles.tienichIcon_Item}
                onPress={() => navigation.navigate('Homework')}>
                  <Image source={require('../../assets/baitapIcon.png')} />
                  <Text style={styles.tienichIcon__ItemText}>Bài tập</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tienichIcon_Item}
                onPress={() => navigation.navigate('Tuition')}>
                  <Image source={require('../../assets/hocphiIcon.png')} />
                  <Text style={styles.tienichIcon__ItemText}>Học phí</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tienichIcon_Item}
                onPress={() => navigation.navigate('Tuition')}>
                  <Image source={require('../../assets/hocphiIcon.png')} />
                  <Text style={styles.tienichIcon__ItemText}>Học phí</Text>
                </TouchableOpacity>

              </View>
            </View>
          </View>

          <View style={styles.hoatdong}>
            <View>
              <Text style={styles.hoatdongHeader}>Hoạt động gần đây</Text>
            </View>

            <View style={styles.row}>
              <Image style={styles.hoatdongImage} source={require('../../assets/hoatdong1.png')} />

              <View>
                <Text style={styles.hoatdongTitle}>Trường ĐH Kinh tế - Luật khai giảng năm học 2022 - 2023</Text>
                <View style={styles.row}>
                  <Image source={require('../../assets/clock.png')} />
                  <Text> 30/09/2022</Text>
                </View>

              </View>
            </View>
            <View style={styles.row}>
              <Image style={styles.hoatdongImage} source={require('../../assets/hoatdong2.png')} />

              <View>
                <Text style={styles.hoatdongTitle}>UEL ký thỏa thuận hợp tác chiến lược với Ernst & Young Việt Nam (EY Việt Nam)</Text>
                <View style={styles.row}>
                  <Image source={require('../../assets/clock.png')} />
                  <Text> 20/09/2022</Text>
                </View>

              </View>
            </View>
            <View style={styles.row}>
              <Image style={styles.hoatdongImage} source={require('../../assets/hoatdong3.png')} />

              <View>
                <Text style={styles.hoatdongTitle}>UEL công bố kết quả trúng tuyển đại học hệ chính quy năm 2022 (phương thức 3)</Text>
                <View style={styles.row}>
                  <Image source={require('../../assets/clock.png')} />
                  <Text> 15/09/2022</Text>
                </View>

              </View>
            </View>
            <View style={styles.row}>
              <Image style={styles.hoatdongImage} source={require('../../assets/hoatdong4.png')} />

              <View style={styles.col}>
                <Text style={styles.hoatdongTitle}>UEL công bố kết quả trúng tuyển đại học hệ chính quy năm 2022 (phương thức 3)</Text>
                <View style={styles.row}>
                  <Image source={require('../../assets/clock.png')} />
                  <Text> 15/09/2022</Text>
                </View>

              </View>
            </View>

          </View>
        </ScrollView>
    )
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
      justifyContent: 'space-around'
      
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
      backgroundColor: '#D0E0FF'
    },
    studentName: {
      fontWeight: 'bold',
      fontSize: 18,
      color: '#252525'
    },
    btnLanguage: {
      position: 'absolute',
      right: 30,
      top: 35,
      zIndex: 2
    },
    effect: {
      position: 'absolute',
      right: 0,
      top:0,
  
      zIndex: 2
    },
    
    tienich: {
      flex: 2,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      padding: 30,
      backgroundColor: '#fff',
      zIndex: 3,
      marginTop: -50
      
    },
    tienichHeader: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },

    tienichIcon: {
      
      display: 'flex',
      flexDirection: 'row',
      // marginHorizontal: 10,
      // justifyContent: 'center',
      marginVertical: 20,
      marginHorizontal: 20,
      // width: 100,
      textAlign: 'center',
      alignContent: 'center',
      justifyContent: 'space-evenly',
    },
    tienichIcon__Item: {
      display: 'flex',
    
      paddingHorizontal: 5,
      // flexWrap: 'wrap',
      // maxWidth: 80,
     
      justifyContent: 'center'
    },
    tienichIcon__ItemIcon: {
      display: 'flex',
      justifyContent: 'center',
      // width: '100%',
      textAlignVertical: 'center',


    },
    tienichIcon__ItemText: {
      fontSize: 18,
      flexWrap: 'wrap'
    },
    btnAllTienich:{
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: 5,
      borderColor: '#D9D9D9',
      backgroundColor: "#fff",
      paddingHorizontal: 10,
      paddingVertical: 5,
  
      display: 'flex',
      // flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'space-around'
    },
    tienichText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#252525'
    },
   
    hoatdong: {
      flex: 4,
      backgroundColor: '#FFF',
      marginTop: 10,
      paddingTop: 30,
      paddingLeft: 30,
      paddingRight: 110,
      paddingBottom: 30
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
      borderRadius: 4,
      marginRight: 10 //cách hình 
    },
    
  });