import {
  Image,
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import {
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { setUser, setloggedIn } from '../redux/actions';
import LogOutButton from '../components/Button_LogOut';

export default function Home() {
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

  return (
    <View style={styles.body}> 
      {
      loggedIn && (
    
      <View style={styles.studentwelcome}>
            {
              user ? 
              <Text style={styles.studentName}> 
                {user.displayName}
              </Text> : null
            }
        <Image style={styles.effect} source={('../assets.effectRound.png')}/>
       
      </View>  )}

          
      <View style={styles.tienich}>
        <View style={styles.tienichHeader}>
          <Text style={styles.tienichText}>Tiện ích</Text>

          <TouchableOpacity style={styles.btnAllTienich}>
            <Text>Tất cả</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.tienichIcon}>
          <TouchableOpacity style={styles.tienichIcon_Item}>
            <Image source={require('../assets/tkbIcon.png')}/>
            <Text>Thời khóa biểu</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tienichIcon_Item}>
            <Image source={require('../assets/xemdiemIcon.png')}/>
            <Text>Xem điểm</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tienichIcon_Item}>
            <Image source={require('../assets/lichthiIcon.png')}/>
            <Text>Lịch thi</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tienichIcon_Item}>
            <Image source={require('../assets/baitapIcon.png')}/>
            <Text>Bài tập</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tienichIcon_Item}>
            <Image source={require('../assets/hocphiIcon.png')}/>
            <Text>Học phí</Text>
          </TouchableOpacity>

        </View>


      </View>

      <View style={styles.hoatdong}>
        <View style={styles.hoatdongHeader}>
          <Text>Hoạt động gần đây</Text>
        </View>

      </View>

            

          

       
       



          
    </View>
);};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    
  },

  studentwelcome: {
    flex: 1,
    zIndex: 1,
    padding: 30,
    position: 'relative',
    backgroundColor: '#D0E0FF'
  },
  studentName: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#252525'
  },
  effect: {
    position: 'absolute',
    right: 0,
    bottom: -20,

    zIndex: 2
  },
  tienich: {
    flex: 2,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
    backgroundColor: '#fff',
    zIndex: 3,
    marginTop: -50
  },
  tienichHeader, hoatdongHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tienichIcon: {
    backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginVertical: 20,


  },
  tienichIcon__Item: {
    width: 300,
    height: 100,
  },
  btnAllTienich:{
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    borderColor: '#D9D9D9',
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,

  },
  hoatdong: {
    flex: 4
  },
  tienichText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#252525'
  },
  
});